const winston = require('winston');
const appRoot = require('app-root-path');

const options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/server.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: process.env.NODE_ENV !== 'production',
    json: false,
    colorize: true,
  },
};

// unhandledRejection
process.on('unhandledRejection', (ex) => {
  throw ex;
});

const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
