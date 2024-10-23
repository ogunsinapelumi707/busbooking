import Bus from "../Models/Bus.js";
import Ticket from "../Models/Ticket.js";
import Trip from "../Models/Trip.js";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import qrCode from "qrcode"; // Replace with the actual QR code library

/* const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}; */

/* export const createTicket = async (req, res) => {
  try {
    const token = req.header("authorization");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.Jwt_seckey);
    const userId = decoded.id;

    const { busplatenumber, origin, destination, price, seats, amount } =
      req.body;

    const trip = await Trip.findOne({
      origin: req.body.origin,
      destination: req.body.destination,
    });

    if (!trip) {
      return res.status(401).json({
        error: `Booking failed: Trip of ${req.body.origin} to ${req.body.destination} not found`,
      });
    }

    // Generate QR code
    const barcodeData = { origin, destination, seats, amount, userId };
    const qrCodeImage = await qrCode.toDataURL(JSON.stringify(barcodeData));

    // Save ticket to MongoDB
    const newTicket = new Ticket({
      busplatenumber,
      origin,
      destination,
      price,
      seats,
      amount,
      barcode: qrCodeImage,
      user: userId,
    });

    const savedTicket = await newTicket.save();
    const bus = await Bus.findOne({ platenumber: busplatenumber });

// Ensure that bus.bookedseats and newTicket.seats are valid numbers
if (!isNaN(bus.bookedseats) && !isNaN(newTicket.seats)) {
  bus.bookedseats = Number(bus.bookedseats) + Number(newTicket.seats);
  console.log(typeof(bus.bookedseats), typeof(newTicket.seats))

  if (bus.bookedseats >= bus.capacity) {
    await Bus.findByIdAndUpdate(bus._id, {
      $set: { Ntrips: bus.Ntrips + 1 },
    });
  }

  await bus.save();
} else {
  console.error("Invalid values for bookedseats or newTicket.seats");
  // Handle the error, set bookedseats to a default value, or take appropriate action.
}

    const user = await User.findByIdAndUpdate(userId, {
      $push: { Tickets: savedTicket._id },
    });

    res.status(201).json({
      success: "Ticket Booked successfully",
      ticket: savedTicket,
    });
  } catch (error) {
    console.error("Error generating ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 */
export const createTicket = async (req, res) => {
  try {
    const token = req.header("authorization");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.Jwt_seckey);
    const userId = decoded.id;
    const Admin = decoded.isAdmin
    
    if(Admin === true){
      const { busplatenumber, origin, destination, price, seats, amount, usermail } =
      req.body;
      console.log(usermail)
      const trip = await Trip.findOne({
        origin: req.body.origin,
        destination: req.body.destination,
      });
   
      if (!trip) {
        return res.status(401).json({
          error: `Booking failed: Trip of ${req.body.origin} to ${req.body.destination} not found`,
        }); 
      }
      //find usermail 
      const userMail = await User.findOne({email: usermail})
      console.log(userMail)
      if(!userMail){
        res.json({
          error: `User with ${usermail} not found`
        })
        return
      }
  
      // Generate QR code
      const barcodeData = { origin, destination, seats, amount, userId };
      const qrCodeImage = await qrCode.toDataURL(JSON.stringify(barcodeData));
  
      // Save ticket to MongoDB
      const newTicket = new Ticket({
        busplatenumber,
        origin,
        destination,
        price,
        seats,
        amount,
        barcode: qrCodeImage,
        usermail: req.body.usermail? userMail.email : null,
        user: userId,
      });
  
      const savedTicket = await newTicket.save();
      console.log(savedTicket)
      const bus = await Bus.findOne({ platenumber: busplatenumber });
  
  // Ensure that bus.bookedseats and newTicket.seats are valid numbers
  if (!isNaN(bus.bookedseats) && !isNaN(newTicket.seats)) {
    bus.bookedseats = Number(bus.bookedseats) + Number(newTicket.seats);
    console.log(typeof(bus.bookedseats), typeof(newTicket.seats))
  
    if (bus.bookedseats >= bus.capacity) {
      await Bus.findByIdAndUpdate(bus._id, {
        $set: { Ntrips: bus.Ntrips + 1 },
      });
    }
  
    await bus.save();
  } else {
    console.error("Invalid values for bookedseats or newTicket.seats");
    // Handle the error, set bookedseats to a default value, or take appropriate action.
  }
  
      const user = await User.findByIdAndUpdate(userId, {
        $push: { Tickets: savedTicket._id },
      });
  
      res.status(201).json({
        success: "Ticket Booked successfully",
        ticket: savedTicket,
      });
  
    }else{// Not an admin logic for creating ticket##########################################################
      const { busplatenumber, origin, destination, price, seats, amount } =
      req.body;

    const trip = await Trip.findOne({
      origin: req.body.origin,
      destination: req.body.destination,
    });

    if (!trip) {
      return res.status(401).json({
        error: `Booking failed: Trip of ${req.body.origin} to ${req.body.destination} not found`,
      });
    }

    // Generate QR code
    const barcodeData = { origin, destination, seats, amount, userId };
    const qrCodeImage = await qrCode.toDataURL(JSON.stringify(barcodeData));

    // Save ticket to MongoDB
    const newTicket = new Ticket({
      busplatenumber,
      origin,
      destination,
      price,
      seats,
      amount,
      barcode: qrCodeImage,
      user: userId,
    });

    const savedTicket = await newTicket.save();
    const bus = await Bus.findOne({ platenumber: busplatenumber });

// Ensure that bus.bookedseats and newTicket.seats are valid numbers
if (!isNaN(bus.bookedseats) && !isNaN(newTicket.seats)) {
  bus.bookedseats = Number(bus.bookedseats) + Number(newTicket.seats);
  console.log(typeof(bus.bookedseats), typeof(newTicket.seats))

  if (bus.bookedseats >= bus.capacity) {
    await Bus.findByIdAndUpdate(bus._id, {
      $set: { Ntrips: bus.Ntrips + 1 },
    });
  }

  await bus.save();
} else {
  console.error("Invalid values for bookedseats or newTicket.seats");
  // Handle the error, set bookedseats to a default value, or take appropriate action.
}

    const user = await User.findByIdAndUpdate(userId, {
      $push: { Tickets: savedTicket._id },
    });

    res.status(201).json({
      success: "Ticket Booked successfully",
      ticket: savedTicket,
    });

    }
    

      } catch (error) {
    console.error("Error generating ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};
// Route to retrieve a ticket by ID
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("user", {username:1, email:1, _id:0})

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({
      success: "Ticket retrieved successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error retrieving ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Users trip history

export const getUserTickets = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.Jwt_seckey);
    const userId = decoded.id;

    const userTickets = await User.findById(userId)
      .select({
        _id: 0,
        username: 1,
        email: 1 /* Add other user fields you want to include */,
      })
      .populate("Tickets", {
        _id: 1,
        date: 1,
        origin: 1,
        destination: 1,
        price: 1,
        seats: 1,
        amount: 1,
        barcode: 1,
      });

    res.status(200).json({
      success: true,
      Tickets: userTickets.Tickets,
    });
  } catch (error) {
    next(error);
  }
};

//ticket details
export const getTicketsDetails = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.Jwt_seckey);
    const userId = decoded.id;

    const userTickets = await User.findById(userId)
      .select({
        _id: 0,
        username: 1,
        email: 1 /* Add other user fields you want to include */,
      })
      .populate("Tickets", {
        _id: 1,
        date: 1,
        origin: 1,
        destination: 1,
        price: 1,
        seats: 1,
        amount: 1,
        barcode: 1,
      });

    res.status(200).json({
      success: true,
      Tickets: userTickets.Tickets,
    });
  } catch (error) {
    next(error);
  }
};
