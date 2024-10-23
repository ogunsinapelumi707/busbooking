import express from "express"
import {  DeleteUser, GetAllUser, GetUser, UpDateUser } from "../Controllers/User.js"
import { getAllBus } from "../Controllers/Bus.js"

const userRouter = express.Router()
const users = [
    {
        username: "pelumi4",
        email: "pelumi4@gmail.com",
      },
      {
        username: "pelumi6",
        email: "pelumi6@gmail.com",
      },
      {
        username: "raphael20",
        email: "raphael20@gmail.com",
      },
      {
        username: "feran12",
        email: "feran12@gmail.com",
      },
      {
        username: "jane45",
        email: "jane45@gmail.com",
      },
]

userRouter.put("/user", UpDateUser)
userRouter.get("/user/:id", GetUser)
/* userRouter.get("/users", GetAllUser) */
userRouter.delete("/deletebus", DeleteUser)

export default userRouter