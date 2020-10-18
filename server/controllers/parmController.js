const pick = require('lodash/pick');
const asyncHandler = require('../middlewares/asyncHandler');
const { User } = require('../models/User');
const { FicheReg } = require('../models/Fiche_Reg');
const { Ambulance } = require('../models/Ambulance');
const { updateSequence } = require('../helper/Sequence');
const io = require('../ini/SocketIO');

// get all users to contact
module.exports.getAll = asyncHandler(async (req, res) => {
  const users = await User.find().select('firstname lastname email telephone role gardeDuration');
  res.status(200).json(users);
});

// fill up prescription and send to the corresponding doctor
module.exports.transferFiche = asyncHandler(async (req, res) => {
  let newFiche = new FicheReg({ num_ordre: await updateSequence('fiche'),
    pending: true,
    ...pick(req.body, ['date',
      'time_fiche',
      'medecin',
      'parm',
      'origine_appel',
      'arr_appel',
      'appelant',
      'nom_appelant',
      'num_appelant',
      'lieu_patient',
      'hopital',
      'service',
      'id_patient',
      'age',
      'sexe',
      'lieu_sousse',
      'adresse_ville',
      'nb_victime']) });

  newFiche = await newFiche.save();
  newFiche.populate({ path: 'parm', select: 'firstname lastname' }, () => {
    io.getSocket().to(newFiche.medecin).emit('fiche_init', newFiche);
  });
  res.sendStatus(200);
});

// lock files when done
module.exports.lockFile = asyncHandler(async (req, res) => {
  const fiche = await FicheReg.findOne({ _id: req.params.id });
  if (!fiche) return res.status(404).json({ status: 404, message: 'La fiche demandée n\'a pas été trouvée.' });

  // update fiche
  // change to transaction later
  await FicheReg.updateOne({ _id: req.params.id }, { cloture: true, sortie: null, permissionToClose: false });
  await Ambulance.findOneAndUpdate({ _id: fiche.sortie }, { inMission: false });
  res.sendStatus(200);
});

// get all none closed fiches
module.exports.getNoneClosed = asyncHandler(async (req, res) => {
  const fiches = await FicheReg.find({ cloture: false })
    .select('num_ordre cloture date time_fiche medecin parm origine_appel arr_appel appelant nom_appelant num_appelant lieu_patient hopital service id_patient age sexe lieu_sousse adresse_ville nb_victime')
    .populate('medecin', '-password -__v -isAdmin').populate('parm', '-password -__v -isAdmin')
    .sort('-num_ordre');
  res.status(200).json(fiches);
});

// affect ambulance
module.exports.affectAmbulance = asyncHandler(async (req, res) => {
  const fiche = await FicheReg.findOne({ _id: req.params.id });
  if (!fiche) return res.status(404).json({ status: 404, message: 'La fiche demandée n\'a pas été trouvée.' });
  if (fiche.sortie) return res.status(400).json({ status: 400, message: 'La fiche a déjà un SMUR affecté!' });
  await FicheReg.updateOne({ _id: req.params.id }, { sortie: req.body.ambulance, affect: false });
  await Ambulance.findOneAndUpdate({ _id: req.body.ambulance }, { inMission: true });
  res.sendStatus(200);
});

// get fiches waiting for affectation
module.exports.getPendingAffectation = asyncHandler(async (req, res) => {
  const fiches = await FicheReg.find({ parm: req.params.id, affect: true })
    .select('num_ordre cloture date time_fiche medecin parm origine_appel arr_appel appelant nom_appelant num_appelant lieu_patient hopital service id_patient age sexe lieu_sousse adresse_ville nb_victime')
    .populate('medecin', '-password -__v -isAdmin').populate('parm', '-password -__v -isAdmin')
    .sort('-num_ordre');
  res.status(200).json(fiches);
});

// get in mission files
module.exports.getInMission = asyncHandler(async (req, res) => {
  const inMission = await FicheReg.find({ $and: [{ sortie: { $exists: true } }, { sortie: { $ne: null } }] })
    .populate('medecin', '-password -_v')
    .populate('parm', '-password -_v')
    .populate('sortie');
  res.status(200).json(inMission);
});
