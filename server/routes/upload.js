const router = require('express').Router();
const multiParty = require('connect-multiparty');
const uuid = require('uuid');
const _ = require('lodash');
const checkAuth = require('../middlewares/checkAuth');
const cloudinary = require('../ini/cloudinary_config');

const multipartMiddleware = multiParty();
// upload image route
router.post('/upload', [checkAuth, multipartMiddleware], (req, res, next) => {
  if (req.files.image) {
    const imagePath = req.files.image.path;
    const uniqueFilename = `${req.user.id}/${uuid()}`;
    cloudinary.uploader.upload(imagePath, { public_id: `images/${uniqueFilename}` }, (error, image) => {
      if (error) next(error);
      res.json(_.pick(image, ['public_id', 'secure_url', 'format']));
    });
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
