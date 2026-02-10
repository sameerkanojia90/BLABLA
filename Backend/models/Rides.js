const mongoose =  require('mongoose');

const RidesSchema  = new mongoose.Schema({


From : {
    type :String,
    require:true,


},
To : {
     type :String,
    require:true,

},
Date : {
     type :String,
    require:true,
},

Price:{
    type:String,
    require:true,
},
Seats : {
     type :Number,
    require:true,
},
RidesRating : {
type :Number,
    require:true,
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  
Status:{
    type: String,
    enum: ['pending', 'ongoing', 'completed'], 
    default: 'pending'
}

}, { timestamps: true });

module.exports = mongoose.model("Ride", RidesSchema);
