const newsletterdetails = require('../models/newsletter.model');
const config = require('../index');
const servermessage = config.config.servermessage;

const utilInst = require('./utils');
const usrEmail = require('./useremail');    // Used for email service;



const logger = require('./logger').logger;  

const newsMessage = servermessage.newsletter;  // User message from server.
const newsemailmsg = servermessage.useremailmsg.news;


createNewsLetter = async(req, res) => {
    const body = req.body;

    if (!body) {
        logger.error(newsMessage.blankuser);
        return res.status(200).json({
            success: false,
            error: newsMessage.blankuser,
        })
    }
    await newsletterdetails.find(body, (err, result) => {
        
        if (err) {
            logger.log("error : ", err);
            return res.status(200).json({ success: false, error: err })
        }

        if (result.length>0) {
            console.log('xxx ', result.length, newsMessage.alreadyRegistered);
            return res
                .status(200)
                .json({ success: false, message: newsMessage.alreadyRegistered })
        } else {
            const newsProfile = new newsletterdetails(body,{});
            if (!newsProfile) {
                return res.status(200).json({ success: false, error: err })
            }
            console.log(body.email, newsemailmsg.subject, newsemailmsg.message)
            newsProfile
                .save()
                .then(() => {
                    sendMail(body.email, newsemailmsg.subject, newsemailmsg.message);
                    return res.status(200).json({ success: true, message: newsMessage.successful })
                })
                .catch(error => {
                    return res.status(200).json({
                        error,
                        message: newsMessage.notcreated,
                    })
                })
        }
    }).catch(err => {
        //console.log(err);
        //return res.status(200).json({success:false, error:err})
    })

}

getAllNewsLetters = async(req, res) =>{
    await newsletterdetails.find({}, (err, result)=>{
        if (err) {
            return res.status(200).json({ success: false, error: err })
        }

        return res.status(200).json({success:true, data:result})
    }).catch(err => {
        //console.log(err);
        //return res.status(200).json({success:false, error:err})
    })
}
getNewsLetterById = async(req, res) =>{
    await newsletterdetails.findOne({email:req.params.id}, (err, result)=>{
        if (err) {
            return res.status(200).json({ success: false, error: err })
        }

        return res.status(200).json({success:true, data:result})
    }).catch(err => {
        err
        //console.log(err);
        //return res.status(200).json({success:false, error:err})
    })
}


removeNewsLetter = async(req, res) =>{
    await newsletterdetails.deleteOne({email:req.params.id}, (err, result)=>{
        if (err) {
            return res.status(200).json({ success: false, error: err })
        }

        return res.status(200).json({success:true, data:null, message:newsMessage.deleteuser})
    }).catch(err => {
        //console.log(err);
        //return res.status(200).json({success:false, error:err})
    })
}



module.exports={
    createNewsLetter,
    getAllNewsLetters,
    getNewsLetterById,
    removeNewsLetter
}