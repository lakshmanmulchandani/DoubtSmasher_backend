import { Schema, model } from 'mongoose';

const chatroomSchema = new Schema({
  name: {type:String,required:true},
  description: String,
  type:{
    type: String,
    enum : ['public','private'],
    default: 'public'
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  topics: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  // TODO: Add other fields
});

const chatroom = model('Chatroom', chatroomSchema);

export default chatroom;
