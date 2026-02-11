const mongoose = require('mongoose');

const RidesSchema = new mongoose.Schema({

  From: {
    type: String,
    required: true,
  },

  To: {
    type: String,
    required: true,
  },

  Date: {
    type: Date,
    required: true,
  },

  Price: {
    type: Number,
    required: true,
  },

  Seats: {
    type: Number,
    required: true,
  },

  RidesRating: {
    type: Number,
    default: 0
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  Status: {
    type: String,
    enum: ['pending', 'accept', 'reject'],
    default: 'pending'
  },

}, { timestamps: true });

module.exports = mongoose.model("Ride", RidesSchema);