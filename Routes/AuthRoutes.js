import  Express  from "express";
import multer from "multer";
import { DeleteUser, GetAllUser, GetUser, Login, Register, UpDateUser, checkmail } from "../Controllers/Auth.js";
const Authrouter = Express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
    },
  });
  
  const upload = multer({ storage: storage });


Authrouter.post("/register", Register)
Authrouter.post("/login", Login)
Authrouter.get("/check-email", checkmail)
Authrouter.get("/users", GetAllUser)
Authrouter.get("/user/:id", GetUser) 
Authrouter.delete("/user/:id", DeleteUser)
Authrouter.put("/updateuser/:id", UpDateUser)        

export default Authrouter    