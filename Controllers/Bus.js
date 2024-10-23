import Bus from "../Models/Bus.js";
import Trip from "../Models/Trip.js";
import multer from "multer";
import path from "path";
import Jwt  from "jsonwebtoken";
import User from "../Models/User.js";
import mongoose from "mongoose";

    
// Multer configuration
const storage = multer.diskStorage({
  destination: "./Public/Images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "bus" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("busImage");




// Adding of Bus endpoint
export const Addbus = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.json({ success: false, error: "File size is too large" });
        }
        // Handle other Multer errors as needed
      } else if (err) {
        return res.json({ success: false, error: "Error uploading image" });
      }

      const { platenumber, capacity, origin, destination } = req.body;
      const trimmedPlatenumber = platenumber ? platenumber.trim() : "";
      const originTrimmed = origin.trim();
      const destinationTrimmed = destination.trim();

      if (!trimmedPlatenumber || !capacity || !originTrimmed || !destinationTrimmed) {
        return res.json({ error: "All fields are required" });
      }

      const existingBus = await Bus.findOne({ platenumber: trimmedPlatenumber });

      if (existingBus) {
        return res.json({ error: `Bus with Platenumber ${trimmedPlatenumber} already exists` });
      }

      const trip = await Trip.findOne({ origin: originTrimmed, destination: destinationTrimmed });

      if (!trip) {
        return res.json({ error: `Trip of ${originTrimmed} to ${destinationTrimmed} not Available` });
      }

      const newBus = new Bus({
        platenumber: trimmedPlatenumber,
        capacity: capacity, 
        busImage: req.file ? `${req.file.filename}` : null,
        trip: trip._id,
      });

      const savedBus = await newBus.save();
      res.status(200).send({ success: "Bus Created Successfully" });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//getting all bus endpoint
export const getAllBus = async (req, res, next) => {
  try {
    const buses = await Bus.find({}).populate("trip", {
      origin: 1,
      destination: 1,
      price: 1,
    });

    res.status(201).json(buses);
  } catch (error) {
    next(error);
  }
};

//getting a bus endpoint

export const getbus = async (req, res, next) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('trip',{price:1, origin:1, destination:1});
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

//getbus to update
export const getbusToUpdate = async (req, res, next) => {
  try {
    const bus = await Bus.findById(req.params.id)
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

//deleting bus endpoint

export const DeleteBus = async (req, res, next) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.status(200).send("Data successfully deleted");
  } catch (err) {
    next(err);
  }
};

//updating Bus

export const UpdateBus = async (req, res, next) => {
  
  try {
    const upDatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
  
    if (!upDatedBus) 
      return res.json({
        error: "Update failed: unable to update Bus",
      });

    res.json({
      success: "Bus Updated Successfully",
    });
  } catch (error) {
    next(error)
  }
};

// Get buses for driver
export const getBusForDriver = async (req, res, next) => {
  try {
    const buses = await Bus.find({driver:null})

    res.status(201).json(buses);
  } catch (error) {
    next(error);
  } 
}; 

// get bus for logged in Driver to track seats
export const getBusLoggedInDriver = async (req, res, next) => {
  try {
    const token = req.header("authorization");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const decoded = Jwt.verify(token, process.env.Jwt_seckey);
    const driverId = decoded.id;
    const driver = await User.findById(driverId);
    
    // Check if the driver has a bus assigned
    if (!driver.bus) {
      return res.status(404).json({ error: "Driver not assigned to a bus" });
    }

    const busId = new mongoose.Types.ObjectId(driver.bus);
    const bus = await Bus.findById({ _id: busId }).populate("trip");
    
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" }); 
    }

    res.json(bus);
  } catch (error) {
    next(error); 
  }
};



