const mongoose = require('mongoose');
const orderModel = require('../models/order.model');
const programModel = require('../models/program.model');
const courseModel = require('../models/course.model');
const config = require('../index');
const razorInst = require('./razorpay.controller');
const utilInst = require('./utils');
const { sendMail } = require('./useremail');
const servermessage = config.config.servermessage;
const orderemailMsg = config.config.orderemailmsg;
const orderMessage = servermessage.order; 


const logger = require('./logger').logger;


//const { emailconfig } = require('../index');
createOrder = async(req, res) =>{
    const body = req.body;

    if (!body) {
        logger.error(`order create error: ${orderMessage.mustinformation}`)
        return res.status(200).json({
            success: false,
            error: coursemessage.errmsg,
        })
    }
    const {userid, useremail, title, description, amount} = body;
    const orderOption = {
        amount: amount+"00",
        currency: "INR",
        receipt: utilInst.generateUniqueCode(),
        payment_capture: 0,
        notes : {
            "useremail":useremail,
            "userid":userid,
            "title":title,
            //"courseid":courseid,
            //"programid":programid,
            "description":description,
            //"language":"Available in 4 major Languages JAVA, C/C++, Python, Javascript",
          }
    }
    let orderDetails = {...body};
    await razorInst.createOrder(orderOption, (result)=>{
        if(result.error !== null && result.error !== undefined) {
            logger.error(`order create error: ${result.error}`)
            return res.status(200).json({status:false, error:result.error})};
        Object.assign(orderDetails, {razor_order_id: result.id, receipt:result.receipt});
    })
    .then(()=>{
        delete orderDetails.useremail;
        delete orderDetails.description;

        const orderProfile = new orderModel(orderDetails,{});
        if (!orderProfile) {
            logger.error(`order create error: ${err}`)
            return res.status(200).json({ success: false, error: err })
        }
        orderProfile
        .save()
        .then(()=>{
            const {userid, courseid, programid, razor_transaction_id,  ...updatedOrderProfile} = orderProfile._doc;
            return res.status(200).json({status:true, data:updatedOrderProfile});
        })
        .catch((err) =>{
            logger.error(`order create error: ${err}`)
            return res.status(200).json({ success: false, error:err })
        })

    })
    .catch((err) =>{
        err
        //console.log("errr", err)
       // if(err) return res.status(200).json({status:false, error:err});
    })
}


getOrder = async(req, res) => {
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: ordermessage.idmatch })
    }
    //console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(200).json({ success: false, message: ordermessage.notfound })
    }

    await orderModel.findOne({ _id: req.params.id },{razor_signature:0, createdAt:0, updatedAt:0}, (err, order) => {
        if (err) {
            logger.error("Order error ", err)
            return res.status(200).json({ success: false, error: err })
        }
        if(order == null || order.length <= 0){
            return res.status(200).json({ success: false, message: ordermessage.notfound })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => err)
}

getUserLearingOrder = async(req, res) => {
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: ordermessage.idmatch })
    }
    //console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(200).json({ success: false, message: ordermessage.notfound })
    }

    await orderModel.find({$or:[
        {'userid':req.params.id},
        {'orderid':req.params.id},
    ] },{razor_signature:0, createdAt:0, updatedAt:0}, (err, order) => {
        if (err) {
            logger.error("Order error ", err)
            return res.status(200).json({ success: false, error: err })
        }
        if(order == null || order.length <= 0){
            return res.status(200).json({ success: false, message: ordermessage.notfound })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => err)
}




getAllOrder = async(req, res) =>{
    await orderModel.find({},{razor_signature:0, createdAt:0, updatedAt:0}, (err, result) => {
        if (err) {
            logger.error("Order get error ", err);
            return res.status(200).json({ success: false, error: err })
        }
        if (!result.length) {
            return res
                .status(200)
                .json({ success: false, error: ordermessage.notfound })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => err)
}

updateOrder = async(req, res) => {
    const body = req.body;
    if (!body) {
        logger.error(`order update error: ${orderMessage.mustinformation}`)
        return res.status(200).json({
            success: false,
            error: orderMessage.mustinformation,
        })
    }
    //console.log(body)
    const orderDetails = {razor_order_id:body.razorpayOrderId, razor_transaction_id:body.razorpayPaymentId, status:true, razor_signature:body.razorpaySignature, updated:Date.now()}
    const orderResult = await orderModel.updateOne({ _id: body.orderCreationId},{$set:orderDetails}, (err, result)=>{
        if (err) {
            logger.error(`order update error: ${err}`)
            return res.status(200).json({success:false, error:err, message: orderMessage.notfound,
            })
        }
        if(!result){
            logger.error(`order update error: ${err}`)
            return res.status(200).json({success:false, error:err, message: orderMessage.notfound,
            })
        }
        let productsInformation = [];
        //console.log('order details', body.orderType)
       /* if(body.orderType === 'program'){
            console.log('program details', body.learningid)
            programModel.updateMany({_id:mongoose.Types.ObjectId(body.learningid)},{$addToSet:{"enrollment":body.userid}}, function(err, res){
                //console.log(res);
            })
        }*/
       // console.log(body.courseid);
       let orderMsg = orderemailMsg.description;
       for(let i=0;i<body.products.length;i++){
           const product = body.products[i];
           orderMsg += `Name:    ${product.name} <br />`;
           orderMsg += `Amount:  INR ${parseFloat(parseFloat(product.amount).toFixed(2)).toLocaleString("en-IN")}<br /><br /><br />`;

           if(product.type === "course"){
            //  console.log('course details', body.orderid, body.userid)
             courseModel.updateMany({_id:mongoose.Types.ObjectId(product.id)},{$addToSet:{"enrollment":body.userid}}, function(err, res){
                  //console.log(res);
              })
          } else if(product.type === "program"){
            programModel.updateMany({_id:mongoose.Types.ObjectId(product.id)},{$addToSet:{"enrollment":body.userid}}, function(err, res){
                //console.log(res);
            })
          }
       }
        
        console.log(orderMsg);
        

        sendMail(body.email, orderemailMsg.subject, orderMsg, ()=>{
            console.log('order mail sent...');
        })


        return res.status(200).json({
            success: true,
            id: body.orderCreationId,
            message: orderMessage.orderUpdate,
        })
    }).catch(err => err)

}

deleteOrder = async(req, res) => {
    if(req.params.id.length !== 24){
        return res.status(200).json({ success: false, error: ordermessage.idmatch })
    }
    //console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(200).json({ success: false, message: ordermessage.notfound })
    }

    await orderModel.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            logger.error("Order delete error ", err)
            return res.status(200).json({ success: false, error: err })
        }

        if (!order) {
            logger.error("Order error ", ordermessage.notfound);
            return res
                .status(200)
                .json({ success: false, error: ordermessage.notfound })
        }

        return res.status(200).json({ success: true, data: ordermessage.deleteOrder })
    }).catch(err => err)

}

module.exports = {
    createOrder,
    getOrder,
    getAllOrder,
    getUserLearingOrder,
    updateOrder,
    deleteOrder
}