import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { CreateError } from "../Utils/ErrorHandler.js";
import Jwt from "jsonwebtoken";
//import { config } from "dotenv"
import multer from "multer";
import path from "path";

import { response } from "express";
import Bus from "../Models/Bus.js";

// Multer configuration
const storage = multer.diskStorage({
  destination: "./Public/Images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "user" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("profileImage");

export const Register = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.json({
            success: false,
            error: "File size is too large",
          });
        }
        // Handle other Multer errors as needed
      } else if (err) {
        return res.json({ success: false, error: "Error uploading image" });
      }

      const { fullname, phone, email, password, bus, role } = req.body;

      if (!fullname || !phone || !email || !password) {
        return res.json({
          success: false,
          message: "Please enter all the details",
        });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.json({
          success: false,
          error: "User already exists with the given email",
        });
      }
      

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        fullname,
        phone,
        email,
        password: hash, 
        profileImage: req.file ? `${req.file.filename}` : null,
        role: role ? "Driver" : null,
        bus: req.body.bus ? bus : null,
      });

      await newUser.save();

      if (newUser.bus) {
         await Bus.findByIdAndUpdate(newUser.bus, { $set: {driver: newUser._id} });
      }
      console.log(newUser); 

      const token = Jwt.sign({ userId: newUser._id }, process.env.Jwt_secKey);

      return res.json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    });
  } catch (err) {
    next(err);
  }
};

export const checkmail = async (req, res) => {
  const { email } = req.query;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
};

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.json({
        error: "Wrong Credential",
      });
    //next(CreateError(404, " Wrong Credentials"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res.json({
        error: "Wrong Credential Password",
      });
    }

    const token = Jwt.sign(
      {
        id: user._id,
        username: user.email,
        profileImage: user.profileImage,
        role: user.role ? user.role : null,
        isAdmin: user.isAdmin,
      },
      process.env.Jwt_secKey
    );
    /* {
        expiresIn: "5m", 
      } */

    const { password, _id, ...otherDetails } = user._doc;
    res.cookie("token", token, {
      httpOnly: true, // HttpOnly flag helps protect against XSS attacks
      secure: process.env.NODE_ENV === "production", // Use secure flag in production for HTTPS
      sameSite: "Strict", // SameSite attribute for additional security
      maxAge: 3600000, // Token will expire in 1 hour (3600000 milliseconds)
    });

    res.json({ token, ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const UpDateUser = async (req, res, next) => {
  try {
    const upDatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!upDatedUser)
      return res.json({
        error: "Update failed: unable to update user",
      });

    res.json({
      success: "User Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const GetUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user)
      return res.json({
        error: `User not found `,
      });
    res.json(user);
  } catch (err) {
    next(err);
    console.error(err);
  }
};

export const GetAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
    console.error(err);
  }
};

export const DeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Data successfully deleted");
  } catch (err) {
    next(err);
  }
};
