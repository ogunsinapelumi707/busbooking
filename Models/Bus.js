import mongoose from "mongoose";

const BusSchema = new mongoose.Schema(
  {
    platenumber: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    busImage: {
      type: String,
      required: true,
    },
    bookedseats: {
      type: Number,
      default: 0,
    },
    Ntrips: {
      type: Number,
      default: 0,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trip",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    }, 
  },
  { timestamps: true }
);  

BusSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;

    // Convert "trip" field to string if it's an ObjectId
    if (returnedObj.trip instanceof mongoose.Types.ObjectId) {
      returnedObj.trip = returnedObj.trip.toString();
    }
  },
});

export default mongoose.model("Bus", BusSchema);
