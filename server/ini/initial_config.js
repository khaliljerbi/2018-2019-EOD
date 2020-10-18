const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const express = require('express');
const winston = require('../ini/logging');

module.exports = (app) => {
  app.use(compression());
  app.use(helmet());
  // app static files
  const publicPath = path.join(__dirname, '..', 'public');
  app.use('/static', express.static(publicPath, { maxAge: '30 days' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('combined', { stream: winston.stream }));
  }
};
