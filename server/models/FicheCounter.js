const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: String,
  fiche_id: Number,
});


module.exports = mongoose.model('fiche_counters', counterSchema);
