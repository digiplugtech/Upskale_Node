const mongoose = require('mongoose');
const config =  require('../index');
const faqschema = config.config.faqschema;

const schema = mongoose.Schema;

const faqdetails = schema(
    faqschema.schema,
    {timestamps:true}
)
module.exports = mongoose.model(faqschema.name, faqdetails)