

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: Number,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    // 🔐 Forget password fields
    resetpassword: {
      type: String,
      default: null,
    },

    expirepassword: {
      type: Date,
      default: null,
    },

    // 🚗 Optional car info (NOT required at signup)
    cardetails: {
      carName: {
        type: String,
        default: "",
      },
      carNumber: {
        type: String,
        default: "",
      },
    },

    // ⭐ Rating
    ratingOverall: {
      type: Number,
      default: 0,
    },

    // 💺 Seats
    Addseats: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);