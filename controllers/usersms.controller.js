const usersmsdetails = require('../models/usersms.model');
const logger = require('./logger').logger;  
const config = require('../index');
const servermessage = config.config.servermessage;
const smsmsg = servermessage.sms;

createSMS = async(req, res) =>{

    usersmsdetails.findOne({req}, (err, result) =>{
        if (err) {
            logger.error("sms error: "+err);
            return res({ success: false, error: err })
        }
        //console.log("result ", result);
        if (result !== null && result.length>0) {
            return res({ success: false, error: smsmsg.smsexit })
        }

        const userSmsDetails = new usersmsdetails(req,{});
        if (!userSmsDetails) {
            logger.error("sms error not found: "+err);
            return res({ success: false, error: err })
        }
        userSmsDetails.save()
        .then(() =>{
            return res({
                success: true,
                data: userSmsDetails,
                message: smsmsg.success,
            })
        }).catch(error => {
            return res({
                success: false,
                error,
                message: smsmsg.fail,
            })
        })
    }).catch(err => err)
}

// Verifying users.
verifyUser = async(req, res) =>{
    const {smsid, phonenumber, smspin} = req.body;
    //console.log("verifyUser ", smsid, phonenumber, smspin);

    await usersmsdetails.findOne({ _id: smsid, phonenumber:phonenumber, smspin:smspin},  (err, user) => {
        if (err) {
            return res({ success: false, error: err });
        }
        const currentDate = Math.floor(Date.now()/1000); 
        // Check for pin times.
        //console.log(user.created, currentDate, (currentDate-user.created));
        if(currentDate - user.created <= (15*60)){

            if(user.verified)return res({success:false, error:smsmsg.alreadyVerify});
            req.body.verified = true;
            usersmsdetails.updateOne({_id:smsid},{$set:req.body}, (err, puser) => {
                if (err) {
                    return res({ success: false, error: err });
                }
                return res({ success: true, message: smsmsg.successverfied });
            })
        } else {
            return res({success:false, error: smsmsg.pinexpired})
        }
    }).catch(err => err)
}

module.exports = {
    createSMS,
    verifyUser
}