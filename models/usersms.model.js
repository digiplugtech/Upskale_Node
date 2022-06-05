const mongoose = require('mongoose');
const config =  require('../index');
const usersmsschema = config.config.usersmsschema;

const schema = mongoose.Schema;
  

const usersmsdetails = schema(
    usersmsschema.schema,
      {timestamps:true}
  )

  module.exports = mongoose.model(usersmsschema.name, usersmsdetails)