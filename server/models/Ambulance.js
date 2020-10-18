const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    lon: {
      type: String,
    },
    lat: {
      type: String,
    },
  },
  equipements: {
    type: [
      {
        type: String, // to change later to mongoose.Schema
      },
    ],
  },
  inMission: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  Ambulance: mongoose.model('ambulances', ambulanceSchema),
  ambulanceSchema,
};
