import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  about: {type: String},
  tags: {type: [String]},
  rollno: {type: Number},
  passoutyear: {type: Number},
  joinedOn: {type: Date, default: Date.now},
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  chatrooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
  }],
});

export default mongoose.model("User", userSchema);
