const express = require('express')

const newsletterCtrl = require('../controllers/newsletter.controller');
const {createNewsLetter, getAllNewsLetters, getNewsLetterById, removeNewsLetter } = newsletterCtrl;
const router = express.Router()

router.post('/newsletter', createNewsLetter)
router.get('/newsletters', getAllNewsLetters)
router.get('/newsletter/:id', getNewsLetterById)
//router.put('/newsletter/:id', newsletterCtrl.updateNewsLetterById)
router.delete('/newsletter/:id', removeNewsLetter)

module.exports = router