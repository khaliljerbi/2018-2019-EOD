const mongoose = require('mongoose');
const { ambulanceSchema } = require('./Ambulance');

const missionSchema = new mongoose.Schema({
  vehicule: ambulanceSchema,
  medecin: {
    type: new mongoose.Schema({
      firstname: String,
      lastname: String,
    }),
    required: true,
  },
  fiche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fiches_regulations',
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  review: {
    type: String,
  },
});

module.exports = mongoose.model('missions', missionSchema);
