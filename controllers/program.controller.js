const programdetails = require('../models/program.model');
const instructordetails = require('../models/instructor.model');
const mongoose = require('mongoose');
const config = require('../index');
const servermessage = config.config.servermessage;

const programmessage = servermessage.program;

const logger = require('./logger').logger;

// Inserting individual program....

createProgram = (req, res) => {
    //console.log("create program ", req.body)
    const body = req.body;
    if (!body) {
        logger.error("program create error: ",programmessage.errmsg)
        return res.status(200).json({
            success: false,
            error: programmessage.errmsg,
        })
    }

    const programInfo = new programdetails(body);
    if (!programInfo) {
        logger.error("program error : "+err);
        return res.status(200).json({ success: false, error: err })
    }
    programInfo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: programInfo._id,
                message: programmessage.success,
            })
        })
        .catch(error => {
            return res.status(200).json({
                error,
                message: programmessage.fail,
            })
        })
}

getProgramByName = async(req, res) =>{
    await programdetails.findOne({ name: req.params.id}, (err, program) => {
        if (err) {
            logger.error('program error: '+err);
            return res.status(200).json({ success: false, error: err })
        }
        if(!program){
            logger.error('program error: '+ programmessage.notfound);
            return res.status(200).json({ success: false, message: programmessage.notfound })
        }

        const {instructor,created, updated, createdAt, updatedAt, ...tempProgram} = program._doc;
        const programId = tempProgram._id.toString();
        tempProgram.type = "program";
        instructordetails.find({'programs':programId}, 
            {firstname:1, lastname:1, experience:1, qualification:1, image:1, skills:1 }, 
            (err, result) => {
            if (err) {
                logger.error("Instructor get error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            if(result.length > 0){
                tempProgram.instructors = result;
            }
            return res.status(200).json({ success: true, data: tempProgram })
        })

/*
        const {instructor, ...tempProgram} = user._doc; 
        const instructorArr = []
        if(instructorArr.length > 0 ){
            const resl = Promise.all(user.instructor.map( async (item, index) => {
            return ( await instructordetails.findById(item, function(err, result){
                    if(err) return res.status(200).json({success:false, error:err})
                    const {_id, email, description, skills, programs, course, createdAt, updatedAt, updated, created, ...tempInstructorDetails} = result._doc;  
                    instructorArr.push(tempInstructorDetails)
                    tempProgram.instructors = instructorArr;
                    if(index == user.instructor.length-1){
                        return res.status(200).json({ success: true, data: tempProgram })
                        
                    }
                })
         
            )}))
        } else {
            tempProgram.instructors = [];
            return res.status(200).json({ success: true, data: tempProgram })
        }*/
        
    }).catch(err => err)    
}

getProgramById = async (req, res) => {
    //console.log(req);
    await programdetails.find({_id: req.params.id}, (err, user) => {
        if (err) {
            logger.error('program error: '+err);
            return res.status(200).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => err)
}

// Updating the program by Id.
updateProgramById = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(200).json({
            success: false,
            error: programmessage.updateerr,
        })
    }
    if(req.params.id.length !== 24 && !moongose.Types.ObjectId.isValid(req.params.id)){
        
        logger.error("Program update error ", programmessage.notfound);
        return res.status(200).json({ success: false, error: programmessage.notfound })
    }
    body.updated= Date.now();
    programdetails.updateOne({ _id: req.params.id }, {$set:body}, { new: true, safe:true}, (err, prgrm) => {

        if (err) {
            logger.error("Program update error ", err);
            return res.status(200).json({
                err,
                message: programmessage.notfound,
            })
        }
        if(!prgrm){
            logger.error("Program update error ", programmessage.notfound);
            return res.status(200).json({
                success:false,
                err,
                message: programmessage.notfound,
            })
        }
        return res.status(200).json({
            success: true,
            id: prgrm._id,
            message: programmessage.updatesuccess,
        })

    })
}

// Getting all the Programs.
getProgramDetails = async (req, res) => {
    await programdetails.find({}, {_id:1, name:1, description:1, level:1}, (err, result) => {
        if (err) {
            logger.error('program :'+ err);
            return res.status(200).json({ success: false, error: err })
        }
        if (!result) {
                logger.error("program error ", programmessage.notfound);
                return res.status(200)
                .json({ success: false, error: programmessage.notfound })
        }
        return res.status(200).json({ success: true, data: result })
    }).populate().catch(err => err)
}

// Deleting Individual program.
deleteProgramById = async (req, res) => {
    //console.log(req)
    if(req.params.id.length !== 24 && !moongose.Types.ObjectId.isValid(req.params.id)){
        logger.error("Program delete error ", coursemessage.notfound);
        return res.status(200).json({ success: false, error: programmessage.notfound })
    }
    await programdetails.findOneAndDelete({ _id: req.params.id }, (err, prgm) => {
        if (err) {
            logger.error("Program delete error ", err);
            return res.status(200).json({ success: false, error: err })
        }

        if (!prgm) {
            logger.error("Program delete error ", coursemessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: programmessage.notfound })
        }

        instructordetails.updateMany({}, 
            {$pull:{"programs":req.params.id}}, 
            (err, result) => {
            if (err) {
                logger.error("Instructor get error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            if(result.length > 0){
                return res.status(200).json({ success: true, message: programmessage.deletecourse })
            } 
        })

        return res.status(200).json({ success: true, message: programmessage.deleteprogram })
    }).catch(err => err)
}

module.exports = {
    createProgram,
    getProgramDetails,
    getProgramByName,
    getProgramById,
    updateProgramById,
    deleteProgramById
}