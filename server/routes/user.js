const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const userController = require('../controllers/userController');
// @Route GET /api/users/all
// @Desc Get all users
// @Access Private
router.get('/all', checkAuth, userController.getAllUsers);
// @Route DELETE /api/users/delete/:id
// @Desc delete user
// @Access Private
router.delete('/delete/:id', [checkAuth, checkAdmin], userController.deleteUser);
// @Route GET /api/users/:id
// @Desc get single user
// @Access Private
router.get('/:id', [checkAuth, checkAdmin], userController.getUser);
// @Route PUT /api/users/update/:id
// @Desc modify user
// @Access Private
router.put('/update/:id', [checkAuth, checkAdmin], userController.updateUser);
// @Route POST /api/users/profile/:id
// @Desc modify user picture
// @Access Private
router.post('/profile/:id', checkAuth, userController.updateProfile);
// @Route PUT /api/users/activate/:id
// @Desc activate
// @Access Private
router.put('/activate/:id', [checkAuth, checkAdmin], userController.activateUser);
module.exports = router;
