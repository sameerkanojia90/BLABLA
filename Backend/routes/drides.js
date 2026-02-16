const express = require("express");
const router = express.Router();
const dridesController = require("../controllers/dridesController");
const isAuthenticated = require("../middleware/Auth");

router.post("/publishride", isAuthenticated,dridesController.publishride);
router.get("/getrides", isAuthenticated, dridesController.getRides);
router.get("/searchrides",isAuthenticated, dridesController.searchRides );
router.get("/ride/:id",isAuthenticated, dridesController.InfoRides);
router.post("/bookride",isAuthenticated, dridesController.BookingRide);
router.get("/bookingstatus",isAuthenticated, dridesController.Status);
router.get("/getstatus/:id",isAuthenticated,dridesController.Getstatus)
router.post("/update-booking-status", dridesController.updateBookingStatus);
module.exports  =  router;
