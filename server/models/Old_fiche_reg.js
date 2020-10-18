const mongoose = require('mongoose');
// const Joi = require('joi');
const OldFicheRegSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  num_ordre: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  time_fiche: {
    type: String,
    required: true,
  },
  medecin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  parm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  origine_appel: {
    type: String,
    // if required later
  },
  arr_appel: {
    type: String,
    // if required later
  },
  appelant: {
    type: String,
  },
  nom_appelant: {
    type: String,
  },
  num_appelant: {
    type: String,
  },
  lieu_patient: {
    type: String,
  },
  hopital: {
    type: String,
  },
  service: {
    type: String,
  },
  id_patient: {
    type: String,
  },
  age: {
    type: Number,
  },
  sexe: {
    type: String,
    enum: ['Masculin', 'Féminin'],
  },
  lieu_sousse: {
    type: String,
  },
  adresse_ville: {
    type: String,
  },
  nb_victime: {
    type: Number,
  },
  motif_appel: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'motifs',
  },
  objet_demande: {
    type: String,
  },
  decision_reg: {
    type: String,
  },
  vh_eng: {
    type: [String],
  },
  smur_eng: {
    type: [String],
  },
  medecin_int: {
    type: String,
  },
  nom_med: {
    type: String,
  },
  bilan: {
    type: String,
  },
  pathologie: {
    type: String,
  },
  typ_pathologie: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'typologies',
  },
  typ_pathologie_diag: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'typologies_specifiques',
  },
  menace_vit: {
    type: String,
    enum: ['Oui', 'Non'],
  },
  circonstance: {
    type: String,
  },
  destination_desiree: {
    type: String,
  },
  destination_obtenue: {
    type: String,
  },
  destination_finale: {
    type: String,
  },
  mission: {
    type: String,
  },
  mission_util: {
    type: String,
  },
  attached_image: {
    type: String,
  },
  cloture: {
    type: Boolean,
    default: false,
  },
  sortie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ambulances',
  },
  pending: {
    type: Boolean,
    default: false,
  },
  affect: {
    type: Boolean,
    default: false,
  },
  permissionToClose: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  OldFicheReg: mongoose.model('old_fiches_regulations', OldFicheRegSchema),
};
