const mongoose = require('mongoose');


const logSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: new mongoose.Schema({
      name: String,
      role: String,
    }),
  },
  message: String,
  actionOn: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('logs', logSchema);
