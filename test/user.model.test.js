/*const mongoose = require('mongoose');
const config =  require('../index');
const userschema = config.config.userschema;

const schema = mongoose.Schema;

const userdetails = schema(
    userschema.schema,
    {timestamps:true}
)
module.exports = mongoose.model(userschema.name, userdetails)


// File: __tests__/user.model.test.js
afterAll( async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.log(err)
    }
  })
*/