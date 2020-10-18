const mongoose = require('mongoose');

const typologieSchema = new mongoose.Schema({
  label: String,
});

module.exports = {
  Typologie: mongoose.model('typologies', typologieSchema),
  typologieSchema,
};
