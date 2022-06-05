const mongoose = require('mongoose');
const config =  require('../index');

const userschema = config.config.userschema;

const schema = mongoose.Schema;

const userdetails = schema(
    userschema.schema,
    {timestamps:true}
)
module.exports = mongoose.model(userschema.name, userdetails)