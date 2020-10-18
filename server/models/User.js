/* eslint-disable func-names */
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    min: 8,
    max: 8,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Chef Service', 'Médecin Régulateur', 'Permanencier', 'Médecin d\'intervention'],
    required: true,
  },
  gardeDuration: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  telephone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastConnection: {
    type: Date,
  },
  isConnected: {
    type: Boolean,
    // default: false,
  },
  isAllowed: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
  },
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = function (duration) {
  const payload = {
    id: this.id, isAllowed: this.isAllowed, profilePicture: this.profilePicture, isAdmin: this.isAdmin, role: this.role, fullName: `${this.firstname} ${this.lastname}`,
  };
  const token = jwt.sign(payload, config.JWT_SECRET, this.isAdmin ? null : { expiresIn: `${duration}d` });
  return token;
};

userSchema.methods.getRemainingDuration = function () {
  const remainingDate = moment(this.gardeDuration);
  return remainingDate.diff(moment(), 'days') + 1;
};

const validateSignUpInput = (input) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    gardeDuration: Joi.date(),
    role: Joi.string().valid(['Chef Service', 'Permanencier', 'Médecin Régulateur', 'Médecin d\'intervention']).required(),
    cin: Joi.string().regex(/^\d{8}$/).required(),
    password: Joi.string(),
    isAdmin: Joi.boolean(),
    telephone: Joi.string().regex(/^\d{8}$/).required(),

  });

  return Joi.validate(input, schema);
};

const validateEditInput = (input) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    gardeDuration: Joi.date(),
    role: Joi.string().valid(['Chef Service', 'Permanencier', 'Médecin Régulateur', 'Médecin Transporteur']).required(),
    telephone: Joi.string().regex(/^\d{8}$/).required(),

  });

  return Joi.validate(input, schema);
};
module.exports = {
  User: mongoose.model('users', userSchema),
  validateSignUpInput,
  validateEditInput,
};
