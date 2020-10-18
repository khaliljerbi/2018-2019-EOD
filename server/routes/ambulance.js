const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const ambulanceController = require('../controllers/ambulanceController');
// @Route POST /api/ambulance/add_ambulance
// @Desc Add a new ambulance
// @Access Private
router.post('/add_ambulance', [checkAuth, checkAdmin], ambulanceController.addAmbulance);
// @Route GET /api/ambulance/all
// @Desc Get all ambulances
// @Access Private
router.get('/all', checkAuth, ambulanceController.getAllAmbulances);

module.exports = router;
