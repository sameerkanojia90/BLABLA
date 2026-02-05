require('dotenv').config();
const User = require("../models/User");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNo } = req.body;
    console.log(req.body);

    if (!name || !email || !password || !phoneNo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);



    const newUser = await User.create({
      name,
      email,
      password: hashed,
      phoneNo,
      cardetails: {
        carName: "Swift",
        carNumber: "1234"
      },
      ratingOverall: 0,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }


    const ismatchpassword = await bcrypt.compare(password, user.password);
    if (!ismatchpassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }


    req.session.user = {
      id: user._id,
      email: user.email
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = { signup, login };

