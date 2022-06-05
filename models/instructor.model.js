const mongoose = require('mongoose');
const config =  require('../index');
const instructorschema = config.config.instructorschema;
const schema = mongoose.Schema;
const programdetails = require('./program.model');
const instructordetails = schema(
    instructorschema.schema,
    
    {timestamps:true}
)
module.exports = mongoose.model(instructorschema.name, instructordetails)