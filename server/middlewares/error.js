/* eslint-disable no-unused-vars */
const winston = require('../ini/logging');

module.exports = (err, req, res, next) => {
  // logging express related errors
  winston.error(`Status:<${err.status || 500}> - Error: ${err.message} - URL: ${req.originalUrl} - Method: ${req.method} - IP: ${req.ip}`);
  res.status(500).send('Erreur interne au serveur !');
};
