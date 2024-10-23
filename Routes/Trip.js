import Express from "express"
import { Addtrip, getAllTrip, getTrip, getplatenumbercapacity, tripHistory } from "../Controllers/Trip.js"
const tripRouter = Express.Router()

tripRouter.get("/trip/:id", getTrip) 
tripRouter.post("/addtrip", Addtrip)
tripRouter.get("/trips", getAllTrip)  
tripRouter.get("/triphistory", tripHistory)  
tripRouter.put("/updatetrip/:id", tripHistory)   

export default tripRouter

