const mongoose = require('mongoose');

const schema = mongoose.Schema;

const paymentdetails = schema(
    {
        orderid: {type:String, required: true, trim:true},
        description: {type:String, required: true, trim:true},
        duration: {type:String, required:true, default:"", trim:true},
        courseid:{type:String, required:false, default:"", trim:true},
        programid:{type:String, required:false, default:"", trim:true},
        fees:{type:Number, required:true, trim:true},
        method:{type:String, require:true, trim:true},
        razor_transaction_id:{type:String, required:false},
        status:{type:Boolean, required:false, default:false},

        created: {
            type: Date,
            default: () => Math.round(Date.now/1000)
        },
        updated: {
            type: Date,
            default: () => Math.round(Date.now/1000)
        },
    },
    {timestamps:true}
)
module.exports = mongoose.model('paymentdetails', paymentdetails)