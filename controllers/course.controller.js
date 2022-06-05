const coursedetails = require('../models/course.model');
const instructordetails = require('../models/instructor.model');
const moongose = require('mongoose');
const config = require('../index');
const servermessage = config.config.servermessage;

const coursemessage = servermessage.course;

//console.log(coursemessage);

const logger = require('./logger').logger;
// Inserting individual program....

createCourse = (req, res) => {
    //console.log("create Course ", req.body)
    const body = req.body;
    if (!body) {
        logger.error(`course create error: ${coursemessage.errmsg}`)
        return res.status(200).json({
            success: false,
            error: coursemessage.errmsg,
        })
    }

    const courseInfo = new coursedetails(body);
    if (!courseInfo) {
        logger.error(`course create error : ${err}`);
        return res.status(200).json({ success: false, error: err })
    }
    courseInfo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: courseInfo._id,
                message: coursemessage.success,
            })
        })
        .catch(error => {
            return res.status(200).json({
                error,
                message: coursemessage.fail,
            })
        })
}

getCourseByName = async(req, res) =>{
    await coursedetails.findOne({ name: req.params.id}, (err, course) => {
        if (err) {
            logger.error(`course error: ${err}`);
            return res.status(200).json({ success: false, error: err })
        }
        if(!course){
            logger.error(`course error: ${coursemessage.notfound}`);
            return res.status(200).json({ success: false, message: coursemessage.notfound })
        }
        const {instructor,created, updated, createdAt, updatedAt, ...tempCourse} = course._doc;
        const courseId = tempCourse._id.toString();
        tempCourse.type = "course";
        //console.log(tempCourse);
        instructordetails.find({'course':courseId}, 
            {firstname:1, lastname:1, experience:1, qualification:1, image:1, skills:1 }, 
            (err, result) => {
            if (err) {
                logger.error("Instructor get error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            if(result.length > 0){
                tempCourse.instructors = result;
            } 
            return res.status(200).json({ success: true, data: tempCourse })
        })

        /*const instructorArr = []
        if(instructor.length > 0 ){
            const resl = Promise.all(user.instructor.map( async (item, index) => {
            return ( await instructordetails.findById(item, function(err, result){
                    if(err) return res.status(200).json({success:false, error:err})
                    const {_id, email, description, skills, programs, course, createdAt, updatedAt, updated, created, ...tempInstructorDetails} = result._doc;  
                    instructorArr.push(tempInstructorDetails)
                    tempCourse.instructors = instructorArr;
                    if(index == user.instructor.length-1){
                        return res.status(200).json({ success: true, data: tempCourse })
                        //console.log(tempCourse);
                    }
                })
            )}))
        }else {
            tempCourse.instructors = [];
            return res.status(200).json({ success: true, data: tempCourse })
        }*/
        
    }).catch(err => err)
    
}

getCourseById = async (req, res) => {
    //console.log(req);
    await coursedetails.findOne({ _id: req.params.id }, (err, course) => {
        if (err) {
            logger.error('program error: '+err);
            return res.status(200).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: course })
    }).catch(err => err)
}

// Updating the program by Id.
updateCourseById = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(200).json({
            success: false,
            error: coursemessage.updateerr,
        })
    }
    if(req.params.id.length !== 24 && !moongose.Types.ObjectId.isValid(req.params.id)){
        
        logger.error("Course update error ", coursemessage.notfound);
        return res.status(200).json({ success: false, error: coursemessage.notfound })
    }
    req.body.updated = Date.now();
    coursedetails.findOneAndUpdate({ _id: req.params.id }, {$set:req.body}, { new: true, safe:true}, (err, course) => {
        if (err) {
            logger.error("Course update error ", err);
            return res.status(200).json({
                err,
                message: coursemessage.notfound,
            })
        }
        if(!course){
            return res.status(200).json({
                success:false,
                err,
                message: coursemessage.notfound,
            })
        }
        return res.status(200).json({
            success: true,
            id: course._id,
            message: coursemessage.updatesuccess,
        })
       
    })
}

// Getting all courses by program.
getCourseByProgram = async(req, res) => {
    const body = req.body;
    //console.log(body);
    //const query = "programs:"body.id""
    await coursedetails.find({programs:body.programId}, (err, result) => {
        if (err) {
            return res.status(200).json({ success: false, error: err })
        }
        if (!result.length) {
            return res
                .status(200)
                .json({ success: false, error: coursemessage.notfound })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => console.log(err))
},

// Getting all the Programs.
getCourseDetails = async (req, res) => {
    
    await coursedetails.find({}, {_id:1, name:1, level:1, duration:1, enrollment:1, deliverymode:1, start_date:1, end_date:1}, (err, result) => {
        if (err) {
            logger.error("Course details error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        if (!result) {
            logger.error("Course details error ", coursemessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: coursemessage.notfound })
        }
        //console.log(result);
        /*const {instructor,created, updated, createdAt, updatedAt, ...tempCourse} = result._doc;
        const courseId = tempCourse._id.toString();
        instructordetails.find({'course':courseId}, 
            {firstname:1, lastname:1, experience:1, qualification:1, image:1, skills:1 }, 
            (err, instructorResult) => {
            if (err) {
                logger.error("Instructor get error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            if(instructorResult.length > 0){
                tempCourse.instructors = instructorResult;
            } 
            return res.status(200).json({ success: true, data: tempCourse })
        })*/

        return res.status(200).json({ success: true, data: result })
    }).catch(err => err)
}


// Deleting Individual program.
deleteCourseById = async (req, res) => {
    //console.log(req)
    if(req.params.id.length !== 24 && !moongose.Types.ObjectId.isValid(req.params.id)){
        logger.error("Course delete error ", coursemessage.notfound);
        return res.status(200).json({ success: false, error: coursemessage.notfound })
    }

    await coursedetails.findOneAndDelete({ _id: req.params.id }, (err, prgm) => {
        if (err) {
            logger.error("Course delete error ", err);
            return res.status(200).json({ success: false, error: err })
        }

        if (!prgm) {
            logger.error("Course delete error ", coursemessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: coursemessage.notfound })
        }

        //console.log(req.params.id);

        instructordetails.updateMany({}, 
            {$pull:{"course":req.params.id}}, 
            (err, result) => {
            if (err) {
                logger.error("Instructor get error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            if(result.length > 0){
                return res.status(200).json({ success: true, message: coursemessage.deletecourse })
            } 
        })
        return res.status(200).json({ success: true, message: coursemessage.deletecourse })
    }).catch(err => err)
}


getInstructor = (pid) => {

}

module.exports = {
    createCourse,
    getCourseDetails,
    getCourseByProgram,
    getCourseByName,
    getCourseById,
    updateCourseById,
    deleteCourseById
}