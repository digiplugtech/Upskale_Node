const request = require("request");
const config = require("../index");


exports.send = function send(otp, mobile, callback) {
    if(config.config.server.sendotp){
        var options = { method: 'POST',
        url: config.config.server.sms_gateway_url,
        headers: 
        { 'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'apiKey':config.config.server.sms_gateway_api_key
        },
        form: 
        { 
        senderId: 'Plugpe',
        sendMethod: 'simpleMsg',
        msgType: 'text',
        mobile: '91'+mobile,
        msg: 'Your PlugPe OTP code is '+otp+'. Please use the code within 15 minutes.',
        duplicateCheck: 'true',
        format: 'json' } };
        //console.log(options);
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
            //console.log("success", body);
            return callback(body);
        });
    }else{
        console.log('OTP : '+otp);
    }
}

exports.sendPaymentSMS = function(payment_link, order){
    console.log('Payment link for your order:'+order.order_no+' is :'+payment_link);
    // var options = { method: 'POST',
    // url: config.server.sms_gateway_url,
    // headers: 
    //  { 'cache-control': 'no-cache',
    //    'content-type': 'application/x-www-form-urlencoded',
    //    'apiKey':config.server.sms_gateway_api_key
    //    },
    // form: 
    //  { 
    //    senderId: 'SMSGAT',
    //    sendMethod: 'simpleMsg',
    //    msgType: 'text',
    //    mobile: '91'+mobile,
    //    msg: 'Your PlugPe OTP code is '+otp+'. Please use the code within 15 minutes.',
    //    duplicateCheck: 'true',
    //    format: 'json' } };

    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);
      
    // });
}