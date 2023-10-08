import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom', 
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
