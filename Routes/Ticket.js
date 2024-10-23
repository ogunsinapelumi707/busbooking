import express  from "express";
import Ticket from "../Models/Ticket.js";
import { createTicket, getTicket, getUserTickets } from "../Controllers/Ticket.js";
import isAuthenticated from "../Utils/verify.js";

const ticketRouter = express.Router()

ticketRouter.post("/ticket",  createTicket)  
ticketRouter.get("/usertickets",  getUserTickets)
ticketRouter.get("/ticket/:id",  getTicket)

export default ticketRouter