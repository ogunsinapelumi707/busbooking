import mongoose from "mongoose";
import User from "./User.js";

const TicketSchema = new mongoose.Schema({
    busplatenumber:{
        type: String,
        required:true,
        
    },
    origin:{
        type: String,
        required:true,
        
    },
    destination:{
        type: String,
        required:true,
        
    },
    price:{
        type: String,
        required:true,
        
    },
    seats:{
        type: Number,
        required:true,
    },
    amount:{ 
        type: String,
        required:true,
    },
    date:{ 
        type: Date,
        default: Date.now()
    },
    barcode:{
        type: String,
        required:true,
    },
    usermail:{
        type: String,
        default: null
    },
    user:
        {
            type: mongoose.Schema.Types.ObjectId,
            
            ref: User
        }
   
},
{timestamps:true}
)

TicketSchema.set('toJSON', {
    transform:(document, returendObj) =>{
      returendObj.id = returendObj._id.toString()
      delete returendObj._id
      delete returendObj.__v
    }
  })

export default mongoose.model("Ticket", TicketSchema)