const express = require('express')

const faqCtrl = require('../controllers/faq.controller');
const { createFaq, getFaqDetails, getFaqById, updateFaqById, deleteFaqById } = faqCtrl;
const router = express.Router()

router.post('/faq', createFaq)
router.get('/faqs', getFaqDetails)
router.get('/faq/:id', getFaqById)
router.put('/faq/:id', updateFaqById)
router.delete('/faq/:id', deleteFaqById)

module.exports = router