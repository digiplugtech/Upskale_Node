const mongoose = require('mongoose');
const fs = require('fs');


const logger = require('../controllers/logger').logger;
const config = require('../index').config;
//console.log(config.config.server);



mongoose
    .connect(config.server.database, 
        { 
            useNewUrlParser: true,
            useUnifiedTopology:true,
            directConnection: false,
        }
    )
    .catch(e => {
        logger.error('database Connection error --'+e.message);
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
