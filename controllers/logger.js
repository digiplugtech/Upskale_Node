//const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, prettyPrint } = format;

const logger = createLogger({
    level: 'info',
    //format: format.json(),

    format: combine(
      //label({ label: 'right meow!' }),
      timestamp(),
      prettyPrint(),
      colorize()
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: '../error.log', level: 'error' }),
      new transports.File({ filename: '../combined.log' }),
    ],


    //defaultMeta: { service: 'user-service' },
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple(),
    }));
  }
  module.exports = {
    logger
  }

  