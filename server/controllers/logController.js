const LogAdmin = require('../models/LogAdmin');

module.exports.getLogs = async (req, res) => {
  const logs = await LogAdmin.find({}).sort('-createdAt');
  res.status(200).json(logs);
};
