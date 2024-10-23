import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Authrouter from "./Routes/AuthRoutes.js";
import tripRouter from "./Routes/Trip.js"
import mongoose from "mongoose";
import busRouter from "./Routes/Bus.js";
import ticketRouter from "./Routes/Ticket.js";
import userRouter from "./Routes/User.js"
import cookieParser from "cookie-parser"; 
import  path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());


mongoose.set("strictQuery", false);
mongoose.connect(process.env.Mongo).then(() => {
  return console.log("mongo connected");
});

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));


// API endpoints routes  
app.get("/", (req, res) => {  
  res.json(Data);
}); 

app.use(cookieParser())
app.use("/api", Authrouter);
app.use("/api", tripRouter);
app.use("/api", busRouter)
app.use("/api,", userRouter) 
app.use("/api", ticketRouter)
  



// Example middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 9910;
 
app.listen(PORT, () => { 
  console.log(`server running on ${PORT}`);   
});
