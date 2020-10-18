const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
const checkAuth = require('../middlewares/checkAuth');
const config = require('../config');

// set api key
sgMail.setApiKey(config.MAIL_API_KEY);

router.post('/', checkAuth, (req, res) => {
  const message = {
    to: req.body.to,
    from: 'samu03@sahloul.com',
    subject: req.body.subject,
    text: req.body.text,
  };
  sgMail.send(message);
  res.sendStatus(200);
});

module.exports = router;
