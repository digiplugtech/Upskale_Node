const express = require('express')

const courseCtrl = require('../controllers/course.controller');
const {createCourse, getCourseDetails, getCourseByProgram, getCourseByName, updateCourseById, deleteCourseById} = courseCtrl;
const router = express.Router()

router.post('/courses', createCourse)
router.get('/courses', getCourseDetails)
router.post('/course/program/:id', getCourseByProgram)
router.get('/course/:id', getCourseByName)
router.put('/course/:id', updateCourseById)
router.delete('/course/:id', deleteCourseById)

module.exports = router