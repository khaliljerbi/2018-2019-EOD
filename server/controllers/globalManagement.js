/* eslint-disable camelcase */
const { Typologie } = require('../models/typologie');
const { Typologie_SP } = require('../models/typologie_sp');
const { Motif } = require('../models/motif');
const asyncHandler = require('../middlewares/asyncHandler');

/** ******************************** TYPOOLOGIES  ******************************************* */

// add new typologie
module.exports.addTypologie = asyncHandler(async (req, res) => {
  const typologie = await Typologie.findOne({ label: req.body.typologie });
  if (typologie) return res.status(400).json({ status: 400, message: 'Une typologie avec ce label existe déjà.' });

  let newTypologie = new Typologie({
    label: req.body.typologie,
  });

  newTypologie = await newTypologie.save();
  res.status(200).json(newTypologie);
});

// delete typologie
module.exports.deleteTypologie = asyncHandler(async (req, res) => {
  const typologie = await Typologie.findOne({ _id: req.params.id });
  if (!typologie) return res.status(404).json({ status: 404, message: 'La typologie demandée n\'a pas été trouvée.' });

  await Typologie.deleteOne({ _id: req.params.id });
  res.sendStatus(200);
});

// get all typologies
module.exports.getAllTypologies = asyncHandler(async (req, res) => {
  const typologies = await Typologie.find();
  res.status(200).json(typologies);
});

// update typologie
module.exports.updateTypologie = asyncHandler(async (req, res) => {
  const typologie = await Typologie.findOneAndUpdate({ _id: req.params.id }, { label: req.body.data }, { new: true });
  if (!typologie) return res.status(404).json({ status: 404, message: 'La typologie demandée n\'a pas été trouvée.' });

  res.status(200).json(typologie);
});

/** ******************************** TYPOLOGIES SPECIFIQUES  ******************************************* */

// add new typologie specific
module.exports.addTypologieSP = asyncHandler(async (req, res) => {
  const typologie = await Typologie_SP.findOne({ label: req.body.typologie_sp });
  if (typologie) return res.status(400).json({ status: 400, message: 'Une typologie avec ce label existe déjà.' });

  let newTypologie = new Typologie_SP({
    label: req.body.typologie_sp,
  });

  newTypologie = await newTypologie.save();
  res.status(200).json(newTypologie);
});

// delete typologie specific
module.exports.deleteTypologieSP = asyncHandler(async (req, res) => {
  const typologie = await Typologie_SP.findOne({ _id: req.params.id });
  if (!typologie) return res.status(404).json({ status: 404, message: 'La typologie demandée n\'a pas été trouvée.' });

  await Typologie_SP.deleteOne({ _id: req.params.id });
  res.sendStatus(200);
});

// get all typologies specific
module.exports.getAllTypologiesSP = asyncHandler(async (req, res) => {
  const typologies = await Typologie_SP.find();
  res.status(200).json(typologies);
});

// update typologie sp
module.exports.updateTypologieSP = asyncHandler(async (req, res) => {
  const typologie = await Typologie_SP.findOneAndUpdate({ _id: req.params.id }, { label: req.body.data }, { new: true });
  if (!typologie) return res.status(404).json({ status: 404, message: 'La typologie demandée n\'a pas été trouvée.' });

  res.status(200).json(typologie);
});


/** ******************************** MOTIFS  ******************************************* */

// add new motif
module.exports.addMotif = asyncHandler(async (req, res) => {
  const motif = await Motif.findOne({ label: req.body.motif });
  if (motif) return res.status(400).json({ status: 400, message: 'Un motif avec ce label existe déjà.' });

  let newMotif = new Motif({
    label: req.body.motif,
  });

  newMotif = await newMotif.save();
  res.status(200).json(newMotif);
});

// delete motif
module.exports.deleteMotif = asyncHandler(async (req, res) => {
  const motif = await Motif.findOne({ _id: req.params.id });
  if (!motif) return res.status(404).json({ status: 404, message: 'Le motif demandé n\'a pas été trouvé.' });

  await Motif.deleteOne({ _id: req.params.id });
  res.sendStatus(200);
});

// get all motifs
module.exports.getAllMotifs = asyncHandler(async (req, res) => {
  const motifs = await Motif.find();
  res.status(200).json(motifs);
});

// update motif
module.exports.updateMotif = asyncHandler(async (req, res) => {
  const motif = await Motif.findOneAndUpdate({ _id: req.params.id }, { label: req.body.data }, { new: true });
  if (!motif) return res.status(404).json({ status: 404, message: 'Le motif demandé n\'a pas été trouvé.' });

  res.status(200).json(motif);
});
