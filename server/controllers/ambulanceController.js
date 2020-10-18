const pick = require('lodash/pick');
const asyncHandler = require('../middlewares/asyncHandler');
const { Ambulance } = require('../models/Ambulance');


module.exports.addAmbulance = asyncHandler(async (req, res) => {
  //  check existance of ambulance
  const ambulance = await Ambulance.findOne({ name: req.body.name });
  if (ambulance) return res.status(400).json({ status: 400, message: 'Une ambulance avec ce label existe déjà.' });

  const newAmbulance = new Ambulance(pick(req.body, ['name', 'equipements']));
  await newAmbulance.save();
  res.sendStatus(200);
});

module.exports.getAllAmbulances = asyncHandler(async (req, res) => {
  const allAmbulances = await Ambulance.find({});
  res.status(200).json(allAmbulances);
});
