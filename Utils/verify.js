import  User from "../Models/User.js"
import Jwt from "jsonwebtoken";


const isAuthenticated = async (req,res,next)=>{
    try {
        const {access_token} = req.cookies;
        if(!access_token){
            return next('Please login to access the data');
        }
        const verify = Jwt.verify(access_token, process.env.Jwt_seckey);
        req.user = await User.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}

export default  isAuthenticated;