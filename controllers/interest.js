import UserProfile from "../models/interest.js";


const createProfile = async (req, res) => {
  try {
    const data = req.body;

    const userProfile = new UserProfile({
        interests:data.interests,
        lookingToConnect: data.lookingToConnect,
        location: data.location,
    })
      console.log(req.body.interests);
    await userProfile.save();
    res.status(201).json(userProfile);

  } catch (error) {
    res.status(500).json({ error: "Could not save user profile" });
  }
};

export {createProfile};
