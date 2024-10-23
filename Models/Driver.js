import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
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
    profileImage: {
      type: String,
      required: true,
    },
    Bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
  },
  { timestamps: true }
);

DriverSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id?.toString(); // Using optional chaining to handle undefined _id
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export default mongoose.model("Driver", DriverSchema);
