const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    messages: [{
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Conversation', conversationSchema);