const asyncHandler = require('../middlewares/asyncHandler');
const Conversation = require('../models/Conversation');
const io = require('../ini/SocketIO');

// create conversation && send message
// convesation will be created only if 1 message is sent
// otherwise it won't be created
module.exports.getConversation = asyncHandler(async (req, res) => {
  let conversation = await Conversation.findOne({ participants: { $all: req.body.participants } });
  if (!conversation) {
    conversation = new Conversation({
      participants: req.body.participants,
    });

    await conversation.save();
  }

  res.status(200).json(conversation);
});

// get user conversations
module.exports.getUserConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({ participants: { $in: req.params.id } })
    .populate('messages.sender', '-password -_v');
  res.status(200).json(conversations);
});

module.exports.getFullConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({ _id: req.params.id }).populate('messages.sender', '-password -_v');
  if (!conversation) return res.status(404).json({ status: 404, message: 'La conversation est introuvable.' });

  res.status(200).json(conversation);
});

module.exports.sendMessage = asyncHandler(async (req, res) => {
  // search for conversation
  let conversation = await Conversation.findOne({ _id: req.params.id });
  if (!conversation) return res.status(404).json({ status: 404, message: 'La conversation est introuvable.' });

  const message = {
    content: req.body.message,
    sender: req.user.id,
  };
  conversation.messages.push(message);
  conversation.lastUpdatedTime = new Date();

  // save conversation
  conversation = await conversation.save();
  conversation.populate({ path: 'messages.sender', select: '-password -_v' }, () => {
    io.getSocket().emit('sending', conversation.messages);
  });
  // const sender = conversation.participants.filter()
  // send conversation messages via socket

  res.sendStatus(200);
});
