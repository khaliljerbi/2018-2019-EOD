const cloudinary = require('cloudinary').v2;
const config = require('../config');
// CLOUDINARY CONFIG;
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
});

module.exports = cloudinary;
