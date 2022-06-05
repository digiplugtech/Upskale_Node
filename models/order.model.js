const mongoose = require('mongoose');
const config =  require('../index');
const orderschema = config.config.orderschema;

const schema = mongoose.Schema;

const orderdetails = schema(
    orderschema.schema,
    {timestamps:true}
)
module.exports = mongoose.model(orderschema.name, orderdetails)