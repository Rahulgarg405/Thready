const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, Email ,and Password are required!" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User is Already Registered ! Please Login . " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(400).json({ msg: "Error in Password Hashing" });
    }

    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const result = await user.save();

    if (!result) {
      return res.status(400).json({ msg: "Error in Saving User" });
    }

    const accessToken = jwt.sign(
      { token: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    if (!accessToken) {
      return res.status(400).json({ msg: "Error while generating Token" });
    }

    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res
      .status(201)
      .json({ msg: `User Registered Succesfully , Hello ${result?.userName}` });
  } catch (err) {
    res.status(400).json({ message: "Error in SignIn !", error: err.message });
  }
};

module.exports = { signin };
