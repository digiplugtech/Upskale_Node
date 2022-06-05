const mongoose = require('mongoose');
const config =  require('../index');
const programschema = config.config.programschema;

const schema = mongoose.Schema;



const programdetails = schema(

    programschema.schema,
    {timestamps:true}
)
module.exports = mongoose.model(programschema.name, programdetails)