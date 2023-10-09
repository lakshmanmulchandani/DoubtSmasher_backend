import { Schema, model } from 'mongoose';

// Define the user profile schema
const userProfileSchema = new Schema({
  interests: [String],
  lookingToConnect: Boolean,
  location: String,
});

// Create the User Profile model
const UserProfile = model("UserProfile", userProfileSchema);

export default UserProfile;
