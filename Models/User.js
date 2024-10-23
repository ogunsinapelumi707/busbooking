import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true,
       // unique:true
    },
    phone:{
        type: Number,
        required:true,
        unique:true 
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    role:{ 
        type: String, 
    }, 
    bus:{
        type: String, 
    },
    password:{
        type: String,
        required:true,
    }, 
    profileImage:{ 
        type: String,
        required:true,
    },
    isAdmin:{ 
        type: Boolean,
        default:false,
    },
    Tickets:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ]
},
{timestamps:true}
)

UserSchema.set('toJSON', {
    transform: (document, returnedObj) => {
      returnedObj.id = returnedObj._id?.toString(); // Using optional chaining to handle undefined _id
      delete returnedObj._id;
      delete returnedObj.__v;
    }
  }); 

export default mongoose.model("User", UserSchema)