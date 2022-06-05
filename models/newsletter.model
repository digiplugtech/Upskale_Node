const mongoose = require('mongoose');
const config =  require('../index');
const newsletterschema = config.config.newsletterschema;

const schema = mongoose.Schema;

const newsletterdetails = schema(
    newsletterschema.schema,
    {timestamps:true}
)
module.exports = mongoose.model(newsletterschema.name, newsletterdetails)