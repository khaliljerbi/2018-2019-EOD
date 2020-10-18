const mongoose = require('mongoose');

const typologieSPSchema = new mongoose.Schema({
  label: String,
});

module.exports = {
  Typologie_SP: mongoose.model('typologies_specifiques', typologieSPSchema),
  typologieSPSchema,
};
