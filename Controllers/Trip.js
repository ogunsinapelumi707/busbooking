import Trip from "../Models/Trip.js";
import Bus from "../Models/Bus.js";

export const getplatenumbercapacity = async (req, res, next) => {
  try {
    const bus = await Bus.find({ Platenumber: 1, Capacity: 1 });
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

export const Addtrip = async (req, res, next) => {
  try {
    const { origin, destination, price } = req.body;

    if (!origin || !price || !destination) {
      return res.json({
        error: "All fields are rquired",
      });
    }

    const newTrip = new Trip({
      price,
      origin,
      destination,
    });
    console.log(newTrip);

    const saveTrip = await newTrip.save();
    res.json({
      success: "Trip Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTrip = async (req, res, next) => {
  try {
    const trips = await Trip.find({});
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

export const tripHistory = async (req, res, next) => {
  try {
    const trips = await Bus.find({ Ntrips: { $gte: 1 } }).populate("trip", {
      origin: 1,
      destination: 1,
      price: 1,
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

export const getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.find({ _id: req.params.id });
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};
