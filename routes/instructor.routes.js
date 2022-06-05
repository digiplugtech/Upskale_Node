const express = require('express')

const instructorCtrl = require('../controllers/instructor.controller');
const {createInstructor, getInstructorDetails, getInstructorById, getInstructorByProgram, getInstructorByCourse, updateInstructorById, deleteInstructorById } = instructorCtrl;
const router = express.Router()

router.post('/instructor', createInstructor)
router.get('/instructors', getInstructorDetails)
router.get('/instructor/:id', getInstructorById)
router.get('/instructor/program/:id', getInstructorByProgram)
router.get('/instructor/course/:id', getInstructorByCourse)
router.put('/instructor/:id', updateInstructorById)
router.delete('/instructor/:id', deleteInstructorById)

module.exports = router