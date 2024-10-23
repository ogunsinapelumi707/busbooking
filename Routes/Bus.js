import express from "express"
import { Addbus, getAllBus, getbus, DeleteBus, UpdateBus, getbusToUpdate, getBusForDriver, getBusLoggedInDriver } from "../Controllers/Bus.js"
import { validateInput } from "../Utils/validateIput.js"

const busRouter = express.Router()


busRouter.post("/addbus", /* validateInput ,*/ Addbus)
busRouter.get("/bus/:id", getbus)
busRouter.get("/getbus/:id", getbusToUpdate)
busRouter.get("/buses", getAllBus)
busRouter.get("/busfordriver", getBusForDriver)
busRouter.get("/logindriverbus", getBusLoggedInDriver)
busRouter.delete("/bus/:id", DeleteBus)  
busRouter.put("/bus/:id", UpdateBus )     
 
export default busRouter 