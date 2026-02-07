require('dotenv').config();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetpassword = resetToken;
    user.expirepassword = Date.now() + 15 * 60 * 1000; 
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `Click this link to reset password: ${resetUrl}`,
    });

    res.json({ success: true, message: "Reset link sent" });

  } catch (error) {
    console.log("Forget Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.json({ success: false, message: "Password required" });
    }

    const user = await User.findOne({
      resetpassword: token,
      expirepassword: { $gt: Date.now() } 
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    const hashh = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, hashh);

    user.resetpassword = undefined;
    user.expirepassword = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successful" });

  } catch (error) {
    console.log("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};







  



module.exports = { signup, login ,forgetPassword ,resetPassword};

