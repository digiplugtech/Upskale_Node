const Razorpay = require('razorpay');
const config = require('../index');
const server = config.config.server;

var razorInst = new Razorpay({
    //key_id: "rzp_live_nlZ2BSj40c8F6x",
    //key_secret: "I4TnAb3glcHe0s3DolU81swS"
    //test 
    //key_id: "rzp_test_2IPLPGGdY2NfNQ"
    //key_secret: "hPdzchOEj3Hx7vjmqj7VU4qA"
    
    key_id: server.razorpay_key,
    key_secret: server.razorpay_secret,
  });

createOrder = async(req, res) =>{
    //console.log("createorder", req);
    await razorInst.orders.create(req, (err, result)=>{
        if(err) return res(err);
        return res(result);
    })
}

createRazorpayment = async(req, res) =>{
    let order_id = null;
    /*await razorInst.payments.createPaymentJson({
        amount: 1,
        currency: "INR",
        order_id: "order_IYpjYnfBXvrsp2",
        email: "saurabh.subham@gmail.com",
        contact: 9111111111,
        method: "card",
        card:{
          number: 4111111111111111,
          name: "saurabh kumar",
          expiry_month: 11,
          expiry_year: 23,
          cvv: 098
        },
        callback_url:"http://localhost:3000/payment",
        ip:"127.0.0.1",
      }, function(err, result){
        console.log(err, "payment result: ", result)
      })*/
    return ("hello");
}
module.exports = {
    createOrder,
    createRazorpayment
}