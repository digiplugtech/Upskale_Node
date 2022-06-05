const express = require('express')

const programCtrl = require('../controllers/program.controller');
const {createProgram, getProgramDetails, getProgramByName, updateProgramById, deleteProgramById} = programCtrl;
const router = express.Router()

router.post('/programs', createProgram)
router.get('/programs/', getProgramDetails)
router.get('/program/:id', getProgramByName)
router.put('/program/:id', updateProgramById)
router.delete('/program/:id', deleteProgramById)

module.exports = router