const express = require("express");
const router = express.Router();
const dridesController = require("../controllers/dridesController");
const isAuthenticated = require("../middleware/Auth");

router.post("/publishride", isAuthenticated,dridesController.publishride);
router.get("/getrides", isAuthenticated, dridesController.getRides);
router.get("/searchrides",isAuthenticated, dridesController.searchRides );
router.get("/ride/:id",isAuthenticated, dridesController.InfoRides);
module.exports  =  router;