const userdetails = require('../models/user.model');
const config = require('../index');
const servermessage = config.config.servermessage;

const smsApi = require('./sms.controller');     // Connecting SMS to send SMS
const usersms = require('./usersms.controller');    // Used for sms recording and controlling service.
const usrEmail = require('./useremail');    // Used for email service;
const utils = require('./utils');   

const logger = require('./logger').logger;  

const userMessage = servermessage.user;  // User message from server.
const useremailmsg = servermessage.useremailmsg;
sendMail = (req, subject, msg) =>{
    
    //logger.log("info ", req.body);
    const userReqEmail = (req !== undefined || req !== null) ? req : req.body.email ;
    const usersubject = (subject !== undefined || subject !== null) ? subject : req.body.subject ;
    const usermsg = (msg !== undefined || msg !== null) ? msg : req.body.msg ;
    usrEmail.sendMail(userReqEmail, usersubject, usermsg, function(result){
        //console.log(result);
        logger.info("email -- "+result)
    })
}

// Creating users
createUser = async(req, res) => {
    const body = req.body;

    if (!body) {
        logger.error(userMessage.blankuser);
        return res.status(200).json({
            success: false,
            error: userMessage.blankuser,
        })
    }
    const {phonenumber, name, email, password, experience} = body;
    const userData = {phonenumber, name, email, password, experience};

    await userdetails.find({$or:[
        {'phonenumber':phonenumber}, {'email':email}
    ]}, (err, result) => {
        console.log("wwwy")
        if (err) {
            logger.error(`user : ${err}` );
            return res.status(200).json({ success: false, error: err })
        }

        if (result.length>0) {
            logger.error(`user : ${userMessage.alreadyRegistered}` );
            return res
                .status(200)
                .json({ success: false, error: userMessage.alreadyRegistered })
        } else {
            const userProfile = new userdetails(userData,{});
            if (!userProfile) {
                logger.error(`user : ${userMessage.err}` );
                return res.status(200).json({ success: false, error: err })
            }
            
            userProfile
                .save()
                .then(() => {
                    const {password,  ...updatedUserProfile} = userProfile._doc;
                    createsmsFunc(userProfile.phonenumber, userProfile.id, function(smsresult){
                        if(smsresult.status != undefined && smsresult.status != "success"){
                            return res.status(200).json({ success: false, error: smsresult.reason })
                        }
                        const tresult = Object.assign({}, {type:"register", email:updatedUserProfile.email, phonenumber, smspin:smsresult.data.smspin, smsid:smsresult.data.id, smsdate:smsresult.data.created });
                        return res.status(200).json({ success: true, data: tresult })
                    });   
                })
                .catch(error => {
                    return res.status(200).json({
                        error,
                        message: userMessage.notcreated,
                    })
                })
        }
    }).catch(err => {
        err;
        //return res.status(200).json({success:false, error:err})
    })

}

//Get All users
getAllUser = async(req, res) =>{
    await userdetails.find({}, (err, result) => {
        if (err) {
            logger.log("Instructor error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        if (!result) {
            logger.error(`user : ${userMessage.usernotfound}` );
            logger.log("Instructor error ", usermessage.usernotfound);
            return res
                .status(200)
                .json({ success: false, error: usermessage.usernotfound })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => err)
}


// Get user by id.
getUserById = async (req, res) => {
    //console.log("getUserById", req);
    if(req.params.id.length !== 24){
        logger.error(`user : ${userMessage.usernotfound}` );
        return res.status(200).json({ success: false, error: userMessage.usernotfound })
    }
    await userdetails.findOne({ _id: req.params.id },{_id:1, name:1, phonenumber:1}, (err, user) => {
        if (err) {
            logger.error(`user : ${err}` );
            return res.status(200).json({ success: false, error: err })
        }
        if(!user){
            logger.error(`user : ${userMessage.usernotfound}` );
            return res.status(200).json({
                success:false,
                err,
                message: userMessage.usernotfound,
            })
        }
        
        return res.status(200).json({ success: true, data: user })
    }).catch(err => err)
}

// Authenticating and getting user information for login user.
getUserDetails = async(req, res) => {
    //console.log('userdetails', req.body)
    const body = req.body;
    if(!body){
        logger.error(`user : ${userMessage.blankuser}` );
        return res.status(200).json({ success: false, error: userMessage.blankuser })
    }
    if(body.userphone === undefined || body.userpassword === undefined || body.userphone === "" || body.userpassword === ""){
        logger.error(`user : ${userMessage.usernotfound}` );
        return res.status(200).json({ success: false, error: userMessage.usernotfound })
    }
    const phonenumber = body.userphone;
    //const password = body.userpassword;
    const userData = {phonenumber};
   
    await userdetails.findOne(userData, {_id:1, name:1, phonenumber:1, email:1, password:1}, (err, result) => {
        if (err) {
            return res.status(200).json({ success: false, error: err })
        }
        //console.log(result);
        if (result === null) {
            return res
                .status(200)
                .json({ success: false, error: userMessage.usernotfound })
        }
        if(result.password !== body.userpassword){
            return res
                .status(200)
                .json({ success: false, error: userMessage.notloginmatched })
        }
        const {password,  ...updatedUserProfile} = result._doc;

        createsmsFunc(result.phonenumber, result.id, function(smsresult){
            if(smsresult.status != undefined && smsresult.status != "success"){
                return res.status(200).json({ success: false, error: smsresult.reason })
            }
            //let tresult = {...updatedUserProfile};

            const tresult = Object.assign({}, {type:"login", email:updatedUserProfile.email, phonenumber, smspin:smsresult.data.smspin, smsid:smsresult.data.id, smsdate:smsresult.data.created });
            //console.log(tresult);
            return res.status(200).json({ success: true, data: tresult })
        });
        
    }).catch(err => err)
}

// Updating user by Id.
updateUserById = async (req, res) => {
    const body = req.body;
    if (!body) {
        logger.error(`user error : ${userMessage.mustinformation}`)
        return res.status(200).json({
            success: false,
            error: userMessage.mustinformation,
        })
    }
    
    if(body.phonenumber !== undefined){
        logger.error(`user error : ${userMessage.cantphone}`)
        return res.status(200).json({
            success: false,
            error: userMessage.cantphone,
        })
    }
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: userMessage.usernotfound })
    }

    body.updated= Date.now();

    userdetails.updateOne({ _id: req.params.id }, {$set:body}, (err, user) => {
        if (err) {
            logger.error(`user error : ${userMessage.usernotfound}`)
            return res.status(200).json({
                err,
                message: userMessage.usernotfound,
            })
        }
        if(user === null){
            return res.status(200).json({
                success:false,
                err,
                message: userMessage.usernotfound,
            })
        }
        return res.status(200).json({
            success: true,
            id: user._id,
            message: userMessage.updateuser,
        })
    })
}

// Used for forget password....
getPassword = async(req, res) => {
    const body = req.body;
    if(!body){
        logger.error(`user : ${userMessage.mustinformation}` );
        return res.status(200).json({ success: false, error: userMessage.mustinformation })
    }
    await userdetails.findOne({phonenumber:body.phonenumber, email:body.email}, {_id:0, phonenumber:1, password:1})
    .populate()
    .then(result => {
        if(!result){
            logger.error(`user : ${userMessage.notmatch}` );
            return res.status(200).json({success:false, error:userMessage.notmatch})    
        }
        //console.log(result);
        let userInformation = useremailmsg.forgetusr.message+"<br /><br /><br />";
        userInformation += "Phonenumber : " + result.phonenumber+"<br />";
        userInformation += "Password : " + result.password;
        sendMail(body.email, useremailmsg.forgetusr.subject, userInformation);
        return res.status(200).json({success:true, message:userMessage.forgetusermsg})
    })
    .catch(error => {
        //logger.error(`Error : ${error}`);
        error
    })
}


// Delete User.
removeUser = async(req, res) => {
    //const body = req.body;
    if(!req.params.id){
        return res.status(200).json({ success: false, error: userMessage.mustinformation })
    }
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: userMessage.usernotfound })
    }
    await userdetails.deleteOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            logger.error(`Instructor error : ${err}`);
            return res.status(200).json({ success: false, error: err })
        }
        if (!user) {
            logger.error(`Instructor error : ${userMessage.usernotfound}`);
            return res
                .status(200)
                .json({ success: false, error: userMessage.usernotfound })
        }

        return res.status(200).json({ success: true, message: userMessage.deleteuser })
    }).catch(err => err)
}

// Verifying user using sms code
verifyUser = async(req, res) => {
   // console.log("verifyuser ",req.body);
    await usersms.verifyUser(req, function(result){
        if(!result){
            logger.error(`user : ${userMessage.blankuser}` );
            return res
                .status(200)
                .json({ success: false, error: userMessage.usernotfound })
        }
        /*if(req.body.usertype === 'register'){
            let userInformation = useremailmsg.registration.message+"<br /><br /><br />";
            userInformation += `Phonenumber : ${req.body.phonenumber}<br />`;
            userInformation += "Password : " + result.password;
            sendMail(req.body.email, useremailmsg.registration.subject, userInformation);
        }*/
        userdetails.findOne({phonenumber:req.body.phonenumber}, {_id:1, name:1, phonenumber:1, email:1, password:1}, (err, userresult) => {
            if (err) {
                return res.status(200).json({ success: false, error: err })
            }
            if(!userresult){
                return res.status(200).json({ success: false, message: usermsg.usernotfound })
            }
            if(req.body.usertype === 'register'){
                let userInformation = useremailmsg.registration.message+"<br /><br /><br />";
                userInformation += `Your Phonenumber : ${userresult.phonenumber}<br />`;
                userInformation += `Your Password : ${userresult.password}`;
                
                sendMail(req.body.email, useremailmsg.registration.subject, userInformation);
            }
            //let tempResult = null;
            const {password, ...tempResult} = userresult._doc;
            return res.status(200).json({success:true, message:result.message, data: tempResult});
        })
    })
    .catch(err => err);
}

// Getting SMS created.........
const createsmsFunc = async(phonenumber, userid, callback) =>{
    const smspin = utils.randomCode();
    // Sending SMS message;
    /*await smsApi.send(smspin, phonenumber, function(result){
        const smsresult = JSON.parse(result);
        if(smsresult.status !== "success"){
            return callback(smsresult);
        }
    })*/

    const usesmsdetail = {userid, phonenumber, smspin}
      await  usersms.createSMS(usesmsdetail, function(result){
            return callback(result);
        });
}

module.exports = {
    createUser,
    getUserDetails,
    getAllUser,
    getUserById,
    updateUserById,
    removeUser,
    verifyUser,
    sendMail,
    getPassword
}