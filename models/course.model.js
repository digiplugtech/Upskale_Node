const mongoose = require('mongoose');
const config =  require('../index');
const courseschema = config.config.courseschema;
const schema = mongoose.Schema;

const coursedetails = schema(
    courseschema.schema,
    
    {timestamps:true}
)
module.exports = mongoose.model(courseschema.name, coursedetails)