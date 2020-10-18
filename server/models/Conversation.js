const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  messages: {
    type: [
      {
        type: new mongoose.Schema({
          receiver: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
          sender: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
          content: String,
          sentAt: {
            type: Date,
            default: Date.now,
          },
          read: {
            type: Boolean,
            default: false,
          },
          seenAt: Date,
        }),
      },
    ],
    default: [],
  },
  lastUpdatedTime: Date,
});

module.exports = mongoose.model('Conversation', ConversationSchema);
