const router = require('express').Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

// @Route POST /api/auth/login
// @Desc login users
// @Access Public
router.post('/login', authController.loginUser);

// @Route POST /api/auth/register
// @Desc Register users
// @Access Private
router.post('/register', [checkAuth, checkAdmin], authController.registerUsers);

// @Route POST /api/auth/checkUser
// @Desc check User Existence
// @Access Private
router.post('/checkUser', [checkAuth, checkAdmin], authController.checkUserLogin);

// @Route POST /api/auth/reset
// @Desc reset password
// @Access public
router.post('/reset', authController.resetPassword);

// @Route GET /api/auth/reset/:token
// @Desc reset password
// @Access public
router.get('/reset/:token', authController.getResetUser);

// @Route PUT /api/auth/reset/:id
// @Desc reset password
// @Access public
router.put('/reset/:token', authController.updatePassword);

// @Route PUT /api/auth/update_password/:id
// @Desc update password
// @Access public
router.put('/update_password/:id', authController.updatePasswordById);

module.exports = router;
