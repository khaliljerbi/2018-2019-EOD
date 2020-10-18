const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const medecinRegController = require('../controllers/medecinRegController');
// @Route POST /api/med/new_fiche
// @Desc Create new fiche regulation
// @Access Private
router.post('/new_fiche', checkAuth, medecinRegController.addFicheReg);
// @Route GET /api/med/all
// @Desc Get all fiches
// @Access Private
router.get('/all', checkAuth, medecinRegController.getAllFicheReg);
// @Route PUT /api/med/fiche/:id
// @Desc update fiche
// @Access Private
router.put('/fiche/:id', checkAuth, medecinRegController.editFicheReg);
// @Route GET /api/med/fiche/:id
// @Desc get single fiche
// @Access Private
router.get('/fiche/:id', checkAuth, medecinRegController.getSingleFiche);
// @Route GET /api/med/pending
// @Desc get pending fiches
// @Access Private
router.get('/pending/:id', checkAuth, medecinRegController.getPendingFiche);
// @Route PUT /api/med/transfer/:id
// @Desc fill up transfered fiche
// @Access Private
router.put('/transfer/:id', checkAuth, medecinRegController.fillUpTransferedFiche);

module.exports = router;
