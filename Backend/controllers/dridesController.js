require('dotenv').config();
const Rides = require("../models/Rides");
const User = require("../models/User");
const Booking = require('../models/Booking')


const publishride = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }

    const { From, To, Date: rideDate, Price, Seats } = req.body;

    if (!From || !To || !rideDate || !Price || !Seats) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }
    const seatsNumber = Number(Seats);

if (seatsNumber <= 0 || seatsNumber > 7) {
  return res.status(400).json({
    success: false,
    message: "Seats must be between 1 and 7"
  });
}

    const ride = new Rides({
      From,
      To,
      Date: new Date(rideDate),
      Price: Number(Price),
      Seats: Number(Seats),
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

    const rides = await Rides.find({
      driver: req.session.user._id
    })
    .populate({
      path: "bookings",
      populate: {
        path: "user",
        select: "name email"
      }
    });

    res.json({
      success: true,
      rides
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
const searchRides = async (req, res) => {
  try {



    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }
    const { From, To, Date: rideDate, Seats } = req.query;

    let query = {};

    if (From) query.From = From;
    if (To) query.To = To;

    if (rideDate) {
      const selectedDate = new global.Date(rideDate);

      const startOfDay = new global.Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new global.Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.Date = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

       if (Seats) {
  const seat = Number(Seats);

  if (seat <= 0 || seat > 7) {
    return res.status(400).json({
      success: false,
      message: "Seats must be between 1 and 7"
    });
  }

  query.Seats = { $gte: seat }; 
}
    const rides = await Rides.find(query).sort({ Date: 1 });

    res.json({
      success: true,
      rides
    });

  } catch (error) {
    console.log("Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
const InfoRides = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }
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



const BookingRide = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }

    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "Ride ID required"
      });
    }

    const newBooking = await Booking.create({
      user: req.session.user.id,
      ride: rideId
    });

    await Rides.findByIdAndUpdate(
  rideId,
  { $push: { bookings: newBooking._id } }
);
    res.status(201).json({
      success: true,
      booking: newBooking
    });

  } catch (err) {
    console.log("Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const Status = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }

    const bookings = await Booking.find({
      user: req.session.user.id
    }).populate("ride");

    res.json({
      success: true,
      bookings
    });

  } catch (err) {
    console.log("Status Error:", err);
    res.status(500).json({
      success: false
    });
  }
};



const Getstatus = async (req,res) => {


try{

const done  =   await Booking.find({
      user: req.session.user.id
    }).populate("ride");

    
    res.status(200).json({
      success:true,
      done
    })
}catch (err)
{
  console.log(err);
  res.status(500).json({
      success: false
    });
}



}


const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    await Booking.findByIdAndUpdate(bookingId, { status });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};
module.exports = {
  publishride
  , getRides,
  searchRides,
  InfoRides,
  BookingRide,
  Status,
  Getstatus,
  updateBookingStatus
}