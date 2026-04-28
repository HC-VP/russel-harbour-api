const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET;


exports.authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      { email },
      "-__v -createdAt -updatedAt"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const expireIn = 24 * 60 * 60;

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: expireIn,
      }
    );

    res.header("Authorization", "Bearer " + token);

    return res.status(200).json({
      message: "authenticate_succeeded",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};