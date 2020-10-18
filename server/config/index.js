let config;

switch (process.env.NODE_ENV) {
  case 'development':
    config = require('./dev');
    break;
  case 'production':
    config = require('./prod');
    break;
  case 'test':
    config = require('./node_test');
    break;
  default:
    config = require('./dev');
    break;
}

module.exports = config;
