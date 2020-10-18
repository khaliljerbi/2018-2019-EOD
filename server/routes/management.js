const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const managementController = require('../controllers/globalManagement');

// @Route POST /api/management/typologie/add_typologie
// @Desc Add a new typologie
// @Access Private
router.post('/typologie/add_typologie', [checkAuth, checkAdmin], managementController.addTypologie);
// @Route GET /api/management/typologie/all
// @Desc Get all typologies
// @Access Private
router.get('/typologie/all', checkAuth, managementController.getAllTypologies);
// @Route DELETE /api/management/typologie/:id
// @Desc delete typologie
// @Access Private
router.delete('/typologie/:id', [checkAuth, checkAdmin], managementController.deleteTypologie);
// @Route PUT /api/management/typologie/:id
// @Desc update typologie
// @Access Private
router.put('/typologie/:id', [checkAuth, checkAdmin], managementController.updateTypologie);


// @Route POST /api/management/typologie_sp/add_typologie_sp
// @Desc Add a new typologie spécifique
// @Access Private
router.post('/typologie_sp/add_typologie_sp', [checkAuth, checkAdmin], managementController.addTypologieSP);
// @Route GET /api/management/typologie_sp/all
// @Desc Get all typologies sp
// @Access Private
router.get('/typologie_sp/all', checkAuth, managementController.getAllTypologiesSP);
// @Route DELETE /api/management/typologie_sp/:id
// @Desc delete typologie sp
// @Access Private
router.delete('/typologie_sp/:id', [checkAuth, checkAdmin], managementController.deleteTypologieSP);
// @Route PUT /api/management/typologie_sp/:id
// @Desc update typologie spécifique
// @Access Private
router.put('/typologie_sp/:id', [checkAuth, checkAdmin], managementController.updateTypologieSP);

// @Route POST /api/management/motif/add_motif
// @Desc Add a new motif
// @Access Private
router.post('/motif/add_motif', [checkAuth, checkAdmin], managementController.addMotif);
// @Route GET /api/management/motif/all
// @Desc Get all motifs
// @Access Private
router.get('/motif/all', checkAuth, managementController.getAllMotifs);
// @Route DELETE /api/management/motif/:id
// @Desc delete motif
// @Access Private
router.delete('/motif/:id', [checkAuth, checkAdmin], managementController.deleteMotif);
// @Route PUT /api/management/motif/:id
// @Desc update motif
// @Access Private
router.put('/motif/:id', [checkAuth, checkAdmin], managementController.updateMotif);


module.exports = router;
