const mongoose = require('mongoose');

const motifSchema = new mongoose.Schema({
  label: String,
});

module.exports = {
  Motif: mongoose.model('motifs', motifSchema),
  motifSchema,
};
