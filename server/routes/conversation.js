const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const conversationController = require('../controllers/conversationController');

// @Route POST /api/conversation
// @Desc check or create conversation
// @Access Private
router.post('/', checkAuth, conversationController.getConversation);

// @Route GET /api/conversation/:id
// @Desc GET full conversation
// @Access Private
router.get('/:id', checkAuth, conversationController.getFullConversation);

// @Route POST /api/conversation/:id
// @Desc send message
// @Access Private
router.post('/:id', checkAuth, conversationController.sendMessage);

// @Route GET /api/conversation/user/:id
// @Desc get user conversation
// @Access Private
router.get('/user/:id', checkAuth, conversationController.getUserConversations);

module.exports = router;
