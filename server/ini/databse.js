const mongoose = require('mongoose');
const winston = require('../ini/logging');
const config = require('../config');

module.exports = () => {
  mongoose.connect(config.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    reconnectTries: 10,
    reconnectInterval: 500,
  })
    .then(() => console.log('Connected to database successfully...'))
    .catch(err => winston.error(err.message));
  mongoose.set('useFindAndModify', false);
};
