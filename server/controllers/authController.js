const bcrypt = require('bcryptjs');
const pick = require('lodash/pick');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const io = require('../ini/SocketIO');
const randomCrypto = require('../helper/RandomCrypted');
const asyncHandler = require('../middlewares/asyncHandler');
const { User, validateSignUpInput } = require('../models/User');
const config = require('../config');

// set api key
sgMail.setApiKey(config.MAIL_API_KEY);

module.exports.registerUsers = asyncHandler(async (req, res) => {
  const { error } = validateSignUpInput(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  let user = await User.findOne({ $or: [{ email: req.body.email }, { cin: req.body.cin }] });
  if (user) return res.status(400).json({ title: 'User error', message: 'Cet utilisateur existe déjà !' });

  const newUser = new User(pick(req.body, ['firstname', 'lastname', 'cin', 'email', 'telephone', 'role', 'gardeDuration']));

  // create a random password
  const newPassword = randomCrypto(12);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  newUser.password = hash;
  user = await newUser.save();
  io.getSocket().emit('user_add', user);

  // send mail
  const message = {
    to: req.body.email,
    from: 'samu03@sahloul.com',
    subject: 'Création de compte',
    html: `<p>Bonjour,</p>
             <p>Votre compte a bien été crée avec les informations suivantes: </p>
             <p>Login: <strong> ${user.email} </strong> / <strong> ${user.cin} </strong>
             <p>Mot de passe: <strong> ${newPassword} </strong>
             <p>Cliquez sur ce lien pour être redirigé vers la page de login: </p> 
             <p>${process.env.NODE_ENV === 'production' ? `https://${req.headers.host}/login` : 'http://localhost:3000/login'}.</p> 
             
             <p> Cordialement </p>.
             <p> Equipe de SAMU. </p>`,
  };
  sgMail.send(message);
  res.status(200).send({ status: 'OK', message: 'Enregistré avec succés !', user });
});

module.exports.loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ $or: [{ email: req.body.login }, { cin: req.body.login }] });

  if (!user) return res.status(400).json({ title: 'Invalid Input', message: 'Les informations fournises sont incorrectes ! Vérifiez de nouveau !' });

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) return res.status(400).json({ title: 'Invalid Input', message: 'Les informations fournises sont incorrectes ! Vérifiez de nouveau !' });
  if (!user.isAdmin) {
    if (new Date(user.gardeDuration) < new Date()) return res.status(400).json({ title: 'Invalid date', message: 'Votre durée de garde affectée par le chef service a expirée! ' });
    if (!user.isAllowed) {
      return res.status(400).json({ title: 'User not activated', message: `Votre Compte a été désactivé.
                                                                           Pour plus d'informations , veuillez contacter votre chef de service.` });
    }
  }
  // register last connection
  await User.updateOne({ $or: [{ email: req.body.login }, { cin: req.body.login }] }, { lastConnection: new Date() });

  let duration;
  if (!user.admin) {
    duration = user.getRemainingDuration();
  }

  const token = user.generateAuthToken(duration);
  res.status(200).header('x-auth-token', token).header('access-control-expose-headers', 'x-auth-token').send(token); // to change later
});

module.exports.checkUserLogin = asyncHandler(async (req, res) => {
  const user = await User.findOne({ $or: [{ email: req.body.email }, { cin: req.body.cin }] });
  if (user) return res.status(400).json({ title: 'User error', message: 'Cet utilisateur existe déjà !' });
  res.status(200).json({ status: 200 });
});

module.exports.resetPassword = asyncHandler(async (req, res) => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');

  // find user with the given mail
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ status: 404, message: 'L\'utilisateur avec cet email n\'existe pas.' });

  // set the token to user
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000;

  await user.save();

  // send mail
  const message = {
    to: req.body.email,
    from: 'samu03@sahloul.com',
    subject: 'Réinitialisation de mot de passe!',
    text: `Bonjour,
           Vous avez demandé une réinitialisation de votre mot de passe
           Cliquez sur ce lien pour être redirigé vers la page de réinitialisation de mot de passe: 
           ${process.env.NODE_ENV === 'production' ? `https://${req.headers.host}/reset/${token}` : `http://localhost:3000/reset/${token}`}. 
           
           Si ce n'est pas vous, ignorez complétement ce mail.
           
           
           Equipe de SAMU.`,
  };
  sgMail.send(message);
  res.sendStatus(200);
});

module.exports.getResetUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token, resetTokenExpiration: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ status: 400, message: 'Token invalid ou sa durée a exprié, veuillez re-envoyez une autre demande de réinitialisation de mot de passe.' });

  res.sendStatus(200);
});
module.exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token, resetTokenExpiration: { $gt: Date.now() } });
  const newPassword = req.body.password;
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  await user.save();
  res.sendStatus(200);
});

module.exports.updatePasswordById = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const newPassword = req.body.password;
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash;

  await user.save();
  res.sendStatus(200);
});
