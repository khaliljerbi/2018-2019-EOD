const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const logController = require('../controllers/logController');

// @Route GET /api/logs
// @Desc Get logs
// @Access Private
router.get('/', [checkAuth, checkAdmin], logController.getLogs);

module.exports = router;
