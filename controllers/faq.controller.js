const faqdetails = require('../models/faq.model');
const mongoose = require('mongoose');

const config = require('../index');
const servermessage = config.config.servermessage;
const faqmessage = servermessage.faq;

const logger = require('./logger').logger;


// Inserting individual FAQ....

createFaq = async(req, res) => {
    console.log("create FAQ ", req.body)
    const body = req.body;
    if (!body) {
        logger.error("faq error: ", faqmessage.errmsg)
        return res.status(200).json({
            success: false,
            error: faqmessage.errmsg,
        })
    }
    await faqdetails.find({name:body.name}, (err, result) => {
        if (err) {
            logger.error("FAQ error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        //console.log(result);
        if (result.length>0) {
            logger.error("FAQ error ", faqmessage.alreadyRegistered);
            return res
                .status(200)
                .json({ success: false, error: faqmessage.alreadyRegistered })
        } else {
            const faqInfo = new faqdetails(body);
            if (!faqInfo) {
                logger.error("FAQ error ", err);
                return res.status(200).json({ success: false, error: err })
            }
            faqInfo
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: faqInfo._id,
                    message: faqmessage.success,
                })
            })
            .catch(error => {
                logger.error("FAQ error ", error);
                return res.status(200).json({
                    error,
                    message: faqmessage.fail,
                })
            })
        }
    })
    .catch(err => err)

}

getFaqById = async (req, res) => {
    console.log(req);

    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: faqmessage.idmatch })
    }
    //console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(200).json({ success: false, message: faqmessage.notfound })
    }


    await faqdetails.findOne({ _id: req.params.id },{answer:1, question:1}, (err, faq) => {
        if (err) {
            logger.error("FAQ error ", err)
            return res.status(200).json({ success: false, error: err })
        }
        if(faq == null || faq.length <= 0){
            return res.status(200).json({ success: false, message: faqmessage.notfound })
        }

        return res.status(200).json({ success: true, data: faq })
    }).catch(err => err)
}

// Updating the FAQ by Id.
updateFaqById = async (req, res) => {
    const body = req.body;
    if (!body) {
        logger.error("FAQ update error ", err)
        return res.status(200).json({
            success: false,
            error: faqmessage.updateerr,
        })
    }
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: faqmessage.idmatch })
    }
    req.body.updated = Date.now();

    faqdetails.findOneAndUpdate({ _id: req.params.id }, {$set:req.body}, (err, faq) => {
        if (err) {
            return res.status(200).json({
                err,
                message: faqmessage.notfound,
            })
        }
        if(faq === null){
            return res.status(200).json({
                success:false,
                err,
                message: faqmessage.notfound,
            })
        }
        
        return res.status(200).json({
            success: true,
            id: faq._id,
            message: faqmessage.updatesuccess,
        })
    }).catch(
        err => err
    )
}

// Getting all the FAQ.
getFaqDetails = async (req, res) => {
    await faqdetails.find({},{answer:1, question:1}, (err, result) => {
        if (err) {
            logger.error("FAQ get error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        if (!result.length) {
            return res
                .status(200)
                .json({ success: false, error: faqmessage.notfound })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => err)
}

// Deleting Individual FAQ.
deleteFaqById = async (req, res) => {
    //console.log(req)
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: faqmessage.notfound })
    }

    await faqdetails.findOneAndDelete({ _id: req.params.id }, (err, faq) => {
        if (err) {
            logger.error("FAQ delete error ", err)
            return res.status(200).json({ success: false, error: err })
        }

        if (!faq) {
            logger.error("FAQ error ", faqmessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: faqmessage.notfound })
        }

        return res.status(200).json({ success: true, data: faqmessage.deletefaq })
    }).catch(err => err)
}

module.exports = {
    createFaq,
    getFaqDetails,
    getFaqById,
    updateFaqById,
    deleteFaqById
}