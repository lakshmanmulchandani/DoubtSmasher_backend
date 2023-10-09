import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

export const signup = async (req, res) => {
  const {name, email, password, passoutyear, rollno} = req.body;

  try {
    if (!password) {
      return res.status(400).json({message: "Password is required."});
    }

    const existingUser = await users.findOne({email});
    if (existingUser) {
      return res.status(409).json({message: "User already exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hashed password: " + hashedPassword);
    const newUser = await users.create({name, email, password: hashedPassword});

    const JWT_SECRET = "secret";
    const token = jwt.sign(
      {email: newUser.email, id: newUser._id},
      JWT_SECRET,
      {expiresIn: "1h"}
    );

    res.status(201).json({result: newUser, token});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong..."});
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  try {
    const existinguser = await users.findOne({email:email});
    if (!existinguser) {
      return res.status(404).json({message: "User don't Exist."});
    }
    console.log(existinguser);

    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({message: "Invalid credentials"});
    }
    // Jwt token is created and sent back to browser as a response in json format
    const JWT_SECRET = "secret";
    const token = jwt.sign(
      {email: existinguser.email, id: existinguser._id},

      process.env.JWT_SECRET || 'secret',
      {expiresIn: "22h"}
    );
    console.log(token);
    res.status(200).json({result: existinguser, token});
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};
