require('dotenv').config();
const Rides = require("../models/Rides");
const User = require("../models/User");


const publishride = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }

    const { From, To, Date, Price, Seats } = req.body;

    if (!From || !To || !Date || !Price || !Seats) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const ride = new Rides({
      From,
      To,
      Date,
      Price,
      Seats,
      user: req.session.user.id
    });
    await ride.save();  
    res.status(201).json({
      success: true,
      message: "Ride published successfully",
      ride
    });

  } catch (error) {
    console.log("Publish Ride Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getRides = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }

    const rides = await Rides.find({ user: req.session.user.id });

    res.json({
      success: true,
      rides
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};


const searchRides = async (req, res) => {
  try {
    const { From, To, Date, Seats } = req.query;

    let query = {};

    if (From) {
      query.From = From;
    }

    if (To) {
      query.To = To;
    }

    if (Date) {
      query.Date = Date;
    }

    if (Seats) {
      query.Seats = Seats;
    }

    const rides = await Rides.find(query);

    res.json({
      success: true,
      rides
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const InfoRides = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Ride ID is required"
      });
    }

    const ride = await Rides.findById(id)
      .populate("user", "email phoneNo"); 

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found"
      });
    }

    res.status(200).json({
      success: true,
      ride
    });

  } catch (error) {
    console.log("InfoRides Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { publishride,getRides,searchRides,InfoRides}