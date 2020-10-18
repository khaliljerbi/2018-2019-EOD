const pick = require('lodash/pick');
const asyncHandler = require('../middlewares/asyncHandler');
const { User, validateEditInput } = require('../models/User');
const io = require('../ini/SocketIO');

module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -__v');
  res.status(200).json(users);
});

module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user) return res.status(404).json({ title: 'User not found', message: 'Cet utilisateur n\'existe pas.' });
  const socket = io.getSocket();
  socket.emit('user_delete', user);
  res.status(200).json({ status: 200, user, message: 'Utilisateur supprimé avec succés.' });
});

module.exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password -__v');
  if (!user) return res.status(404).json({ status: 'not found', message: 'Utilisateur introuvable.' });
  res.status(200).send(user);
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  const { error } = validateEditInput(req.body);
  if (error) return res.status(422).json(error.details[0].message);
  const user = await User.findOneAndUpdate({ _id: req.params.id }, pick(req.body, ['firstname', 'lastname', 'telephone', 'gardeDuration', 'role']), { new: true });
  if (!user) return res.status(404).json({ title: 'User not found', message: 'Cet utilisateur n\'existe pas.' });

  res.status(200).send({});
});

module.exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, { profilePicture: req.body.attached_image });
  if (!user) return res.status(404).json({ title: 'User not found', message: 'Cet utilisateur n\'existe pas.' });
  res.sendStatus(200);
});

module.exports.activateUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, { isAllowed: req.body.isAllowed });
  if (!user) return res.status(404).json({ title: 'User not found', message: 'Cet utilisateur n\'existe pas.' });
  res.sendStatus(200);
});
