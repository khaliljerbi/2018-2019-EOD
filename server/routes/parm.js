const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const parmController = require('../controllers/parmController');

// @Route GET /api/parm/annuaire
// @Desc Get all users
// @Access Private
router.get('/annuaire', checkAuth, parmController.getAll);

// @Route POST /api/parm/new_fiche_info
// @Desc Create a new info fiche
// @Access Private
router.post('/new_fiche_info', checkAuth, parmController.transferFiche);

// @Route GET /api/parm/noneclosed
// @Desc Get all none closed fiches
// @Access Private
router.get('/noneclosed', checkAuth, parmController.getNoneClosed);

// @Route PUT /api/parm/close/:id
// @Desc close fiche
// @Access Private
router.put('/close/:id', checkAuth, parmController.lockFile);

// @Route PUT /api/parm/close/:id
// @Desc affect ambulance
// @Access Private
router.put('/affect/:id', checkAuth, parmController.affectAmbulance);

// @Route GET /api/parm/pending_affect/:id
// @Desc get pending to affect fiches
// @Access Private
router.get('/pending_affect/:id', checkAuth, parmController.getPendingAffectation);

// @Route GET /api/parm/in_mission
// @Desc get inMission files
// @Access Private
router.get('/in_mission', parmController.getInMission);

module.exports = router;
