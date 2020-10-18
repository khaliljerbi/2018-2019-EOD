const pick = require('lodash/pick');
const mongoose = require('mongoose');
const asyncHandler = require('../middlewares/asyncHandler');
const io = require('../ini/SocketIO');
const { FicheReg } = require('../models/Fiche_Reg');
const { OldFicheReg } = require('../models/Old_fiche_reg');
const LogAdmin = require('../models/LogAdmin');
const { updateSequence } = require('../helper/Sequence');

module.exports.addFicheReg = async (req, res, next) => {
  const ficheReg = await FicheReg.findOne({ num_ordre: req.body.num_ordre });
  if (ficheReg) return res.status(400).json({ status: 400, message: 'Une fiche avec le même numéro d\'ordre existe déjà' });

  const newFicheReg = new FicheReg({ num_ordre: await updateSequence('fiche'),
    pending: false,
    ...pick(req.body, [
      'date',
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
      'nb_victime',
      'motif_appel',
      'objet_demande',
      'decision_reg',
      'vh_eng',
      'smur_eng',
      'medecin_int',
      'nom_med',
      'bilan',
      'pathologie',
      'typ_pathologie',
      'typ_pathologie_diag',
      'menace_vit',
      'circonstance',
      'destination_desiree',
      'destination_obtenue',
      'destination_finale',
      'mission',
      'mission_util',
      'attached_image']) });
  let newLog = new LogAdmin({
    creator: { // to change later need to add PARM ID and MED ID
      _id: req.user._id,
      name: req.user.fullName,
      role: req.user.role,
    },
    message: 'a crée une fiche de régulation: ',
    actionOn: newFicheReg._id,
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await newFicheReg.save({ session });
    newLog = await newLog.save({ session });
    await session.commitTransaction();
    session.endSession();
    // realtime socket add log
    io.getSocket().emit('log_admin', newLog);
    res.status(200).json({});
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

module.exports.getAllFicheReg = asyncHandler(async (req, res) => {
  const list = await FicheReg.find()
    .populate('medecin', '-password -__v -isAdmin')
    .populate('sortie')
    .populate('parm', '-password -__v -isAdmin')
    .sort('-num_ordre');
  res.status(200).json(list);
});

module.exports.editFicheReg = async (req, res, next) => {
  const updatedFiche = pick(req.body, [
    'date',
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
    'nb_victime',
    'motif_appel',
    'objet_demande',
    'decision_reg',
    'vh_eng',
    'smur_eng',
    'medecin_int',
    'nom_med',
    'bilan',
    'pathologie',
    'typ_pathologie',
    'typ_pathologie_diag',
    'menace_vit',
    'circonstance',
    'destination_desiree',
    'destination_obtenue',
    'destination_finale',
    'mission',
    'mission_util',
    'attached_image']);
  const oldFiche = await FicheReg.findOne({ _id: req.params.id });
  if (!oldFiche) return res.status(404).json({ status: 404, message: 'La fiche de régulation demandée n\'a pas été trouvée.' });

  let newLog = new LogAdmin({
    creator: {
      _id: req.user._id,
      name: req.user.fullName,
      role: req.user.role,
    },
    message: 'a modifié une fiche de régulation: ',
    actionOn: oldFiche._id,
  });
  // save the old fiche in another collection to keep track
  const archive = new OldFicheReg({ old_id: req.params.id,
    ...pick(oldFiche, ['num_ordre',
      'date',
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
      'nb_victime',
      'motif_appel',
      'objet_demande',
      'decision_reg',
      'vh_eng',
      'smur_eng',
      'medecin_int',
      'nom_med',
      'bilan',
      'pathologie',
      'typ_pathologie',
      'typ_pathologie_diag',
      'menace_vit',
      'circonstance',
      'destination_desiree',
      'destination_obtenue',
      'destination_finale',
      'mission',
      'mission_util',
      'attached_image']) });
  // mongoose session for transactions
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await FicheReg.updateOne({ _id: req.params.id }, updatedFiche, { session });
    newLog = await newLog.save({ session });
    await archive.save({ session });
    await session.commitTransaction();
    session.endSession();
    io.getSocket().emit('log_admin', newLog);
    res.status(200).json({});
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

module.exports.getSingleFiche = asyncHandler(async (req, res) => {
  const fiche = await FicheReg.findOne({ _id: req.params.id }).select('-__v')
    .populate('medecin', '-password -__v -isAdmin')
    .populate('parm', '-password -__v -isAdmin')
    .populate('motif_appel')
    .populate('typ_pathologie')
    .populate('typ_pathologie_diag');
  if (!fiche) return res.status(404).json({ status: 404, message: 'La fiche demandée n\'a pas été trouvée.' });

  res.status(200).json(fiche);
});

module.exports.getPendingFiche = asyncHandler(async (req, res) => {
  const fiches = await FicheReg.find({ pending: true, medecin: req.params.id }).populate('medecin', '-password -__v -isAdmin').populate('parm', '-password -__v -isAdmin').sort('-createdAt');
  res.status(200).json(fiches);
});

module.exports.fillUpTransferedFiche = async (req, res, next) => {
  const ficheReg = await FicheReg.findOne({ _id: req.params.id }).populate('medecin', 'firstname lastname').populate('parm', 'firstname lastname');
  if (!ficheReg) return res.status(400).json({ status: 404, message: 'La fiche demandée est introuvable!' });
  const newFicheReg = {
    pending: false,
    permissionToClose: true,
    ...pick(req.body, [
      'date',
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
      'nb_victime',
      'motif_appel',
      'objet_demande',
      'decision_reg',
      'vh_eng',
      'smur_eng',
      'medecin_int',
      'nom_med',
      'bilan',
      'pathologie',
      'typ_pathologie',
      'typ_pathologie_diag',
      'menace_vit',
      'circonstance',
      'destination_desiree',
      'destination_obtenue',
      'destination_finale',
      'mission',
      'mission_util',
      'attached_image',
      'affect',
    ]),
  };
  let newLog = new LogAdmin({
    creator: { // to change later need to add PARM ID and MED ID
      _id: req.user._id,
      name: req.user.fullName,
      role: req.user.role,
    },
    message: `a rempli une fiche crée par le PARM ${ficheReg.parm.firstname} ${ficheReg.parm.lastname}: `,
    actionOn: req.params.id,
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatedFiche = await FicheReg.findOneAndUpdate({ _id: req.params.id }, newFicheReg, { new: true, session })
      .populate('medecin', '-password -__v -isAdmin');
    newLog = await newLog.save({ session });
    await session.commitTransaction();
    session.endSession();
    io.getSocket().emit('log_admin', newLog);
    // to notifiy parm that the file has been edited and now can be locked
    io.getSocket().to(ficheReg.parm._id).emit('fiche_end', updatedFiche);
    res.sendStatus(200);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
