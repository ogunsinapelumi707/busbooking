import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
    origin:{
        type: String,
        require: true
    },
    destination:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
   
},
{
    timestamps: true
}
)

TripSchema.set('toJSON', {
    transform:(document, returendObj) =>{
      returendObj.id = returendObj._id.toString()
      delete returendObj._id
      delete returendObj.__v
    }
  }) 

  export default mongoose.model("Trip", TripSchema)