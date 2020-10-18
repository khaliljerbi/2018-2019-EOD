const Sequence = require('../models/FicheCounter');

module.exports.updateSequence = async (name) => {
  const counter = await Sequence.findOneAndUpdate({ name }, { $inc: { fiche_id: 1 } }, { new: true, upsert: true });
  return counter.fiche_id;
};

module.exports.getSequence = async (name) => {
  const counter = await Sequence.findOne({ name });
  return counter.fiche_id;
};
