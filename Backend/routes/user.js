const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const isAuthenticated = require("../middleware/Auth");

router.post("/signup", authController.signup);
router.post("/login",authController.login);

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
 
module.exports = router;