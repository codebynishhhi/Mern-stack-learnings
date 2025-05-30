import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
// in the auth controller we write the logic for register and login
export const registerUser = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log
    const { email, passWord, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists!" });

    const hashedPassword = await bcrypt.hash(passWord, 10);
    const user = new User({ name, email, passWord: hashedPassword });
    await user.save();

    res.status(200).json({ msg: "User registered successfully!" });
  } catch (e) {
    console.error("Error in registerUser:", e); // Debug log
    res.status(500).json({ msg: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log(req.body, "login issue");
    const { email, passWord } = req.body;
    const user = await User.findOne({ email });
    // 1st case - user not found to fail login
    if (!user)
      return res
        .status(400)
        .json({ msg: "User not found - invalid credentials" });

    // 2nt case - password not matched, login failed
    const isMatch = await bcrypt.compare(passWord, user.passWord);
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "User not found - invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // <--- Must match .env
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("Error in loginUser:", e); // Debug log
    res.status(500).json({ msg: "Internal server error!" });
  }
};
