const express = require("express");
const upload = require("../middleware/upload");
const authController = require("../controllers/authController");
const router = express.Router();
const isAuthenticated = require("../middleware/Auth");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/signup", authController.signup);
router.post("/login",authController.login);
router.post("/forgetpassword", authController.forgetPassword)
router.post("/resetpassword/:token",authController.resetPassword )
router.get("/profile",authController.getProfile);
router.get("/dashboard", isAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to dashboard",
        user: req.session.user
    });
});


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({
            success: true,
            message: "Logged out successfully"
        });
    });
});
 
router.post("/upload-profile",upload.single("profilePic"),
  async (req, res) => {
    try {

      if (!req.session.user) {
        return res.status(401).json({ success: false });
      }

      const user = await User.findById(req.session.user.id);

      user.profilePic = req.file.filename;
      await user.save();

      res.json({ success: true });

    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;