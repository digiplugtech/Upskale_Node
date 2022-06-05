const instructordetails = require('../models/instructor.model');
const mongoose = require('mongoose');
//const dash = require('lodash');

const config = require('../index');
const servermessage = config.config.servermessage;

const instructormessage = servermessage.instructor;

const logger = require('./logger').logger;

// Inserting individual program....

createInstructor = async(req, res) => {
    //console.log("create Instructor ", req.body)
    const body = req.body;
    if (!body) {
        logger.error("Instructor error ", instructormessage.errmsg);
        return res.status(200).json({
            success: false,
            error: instructormessage.errmsg,
        })
    }

    await instructordetails.find({
        $or:[
            {email:body.email},
        ]
    }, (err, result) => {
        
        if (err) {
            logger.error("Instructor error ", err);
            return res.status(200).json({ success: false, error: err })
        }

        if (result.length>0) {
            return res
                .status(200)
                .json({ success: false, error: instructormessage.alreadyRegistered })
        } else {
            const instructorInfo = new instructordetails(body);
            if (!instructorInfo) {
                logger.error("Instructor error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            instructorInfo
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: instructorInfo._id,
                        message: instructormessage.success,
                    })
                })
                .catch(error => {
                    logger.error("Instructor error ", error);
                    return res.status(200).json({
                        success:false,
                        error,
                        message: instructormessage.fail,
                    })
                })
        }
    })
    .catch(
        err => err
    )
}

getInstructorByProgram  = async (req, res) => {
     console.log('program ',req.params.id);
     if(req.params.id.length !== 24){
         return res.status(200).json({ success: false, error: instructormessage.idmatch })
     }
     
     await instructordetails.find({"programs": req.params.id}, (err, result) => {
         if (err) {
             logger.error("Instructor get error ", err);
             return res.status(200).json({ success: false, error: err })
         }
         if(result.length <= 0){
             return res.status(200).json({ success: false, message: instructormessage.notfound })
         }
 
         return res.status(200).json({ success: true, data: result })
     }).catch(err => err
         //console.log(err)
     )
 }

 getInstructorByCourse  = async (req, res) => {
    console.log('program ',req.params.id);
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: instructormessage.idmatch })
    }
    
    await instructordetails.find({"course": req.params.id}, (err, result) => {
        if (err) {
            logger.error("Instructor get error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        if(result.length <= 0){
            return res.status(200).json({ success: false, message: instructormessage.notfound })
        }

        return res.status(200).json({ success: true, data: result })
    }).catch(err => err
        //console.log(err)
    )
}



getInstructorById = async (req, res) => {
    //console.log(req.params.id);
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: instructormessage.idmatch })
    }
    //console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(200).json({ success: false, message: instructormessage.notfound })
    }

    await instructordetails.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, (err, result) => {
        if (err) {
            logger.error("Instructor get error ", err);
            return res.status(200).json({ success: false, error: err })
        }
//        console.log(result);

        if(result == null || result.length <= 0){
            return res.status(200).json({ success: false, message: instructormessage.notfound })
        }

        return res.status(200).json({ success: true, data: result })
    }).catch(err => err
        //console.log(err)
    )
}

// Updating the instructor by Id.
updateInstructorById = async (req, res, next) => {
    const body = req.body;
    if (!body) {
        return res.status(200).json({
            success: false,
            error: instructormessage.updateerr,
        })
    }
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: instructormessage.idmatch })
    }
    const instru = body;
    instru.updated = Date.now();

    instructordetails.findOneAndUpdate({ _id: req.params.id }, {$set: instru }, { new: true, safe:true}, (err, instructor) => {
        if (err) {
            logger.error("Instructor update error ", err);
            return res.status(200).json({
                success:false,
                err,
                message: instructormessage.notfound,
            })
        }
        if(instructor === null){
            return res.status(200).json({
                success:false,
                err,
                message: instructormessage.notfound,
            })
        }
        return res.status(200).json({
            success: true,
            id: instructor._id,
            message: instructormessage.updatesuccess,
        })
        
    }). catch(
        err => err
    )
}

// Getting all the Programs.
getInstructorDetails = async (req, res) => {
    await instructordetails.find({}, (err, result) => {
        if (err) {
            logger.error("Instructor error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        if (!result.length) {
            logger.error("Instructor error ", instructormessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: instructormessage.notfound })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => err)
}

// Deleting Individual program.
deleteInstructorById = async (req, res) => {
   // console.log(req)
   if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: instructormessage.notfound })
    }
    await instructordetails.findOneAndDelete({ _id: req.params.id }, (err, instructor) => {
        if (err) {
            logger.error("Instructor error ", err);
            return res.status(200).json({ success: false, error: err })
        }

        if (!instructor) {
            logger.error("Instructor error ", instructormessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: instructormessage.notfound })
        }

        return res.status(200).json({ success: true, message: instructormessage.deleteInstructor })
    }).catch(err => err)
}

module.exports = {
    createInstructor,
    getInstructorDetails,
    getInstructorById,
    getInstructorByProgram,
    getInstructorByCourse,
    updateInstructorById,
    deleteInstructorById
}