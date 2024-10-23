import User from "../Models/User.js"

export const UpDateUser = async(req, res, next) =>{
    try {
        const upDatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
            )
        res.json(upDatedUser)                             
       } catch (err) {
           next(err)
       }
       
}

export const GetUser = async(req, res, next) =>{
    try {
        const user = await User.findById(req.params.id)
            res.json(user)
    } catch (err) {
        next(err)
    }
}




export const GetAllUser = async(req, res, next) =>{
    try {
       const users = await User.find({})
        res.json(users)
    } catch (err) {
        next(err)
        console.error(err)
    }
}

export const DeleteUser = async(req, res, next) =>{ 
    try {
        await User.findByIdAndDelete(req.params.id)
            res.status(200).send("Data successfully deleted") 
        
    } catch (err) {
       next(err)
    }
}