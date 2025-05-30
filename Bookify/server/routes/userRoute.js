import express from "express"
import { auth } from "../middlewares/authmiddleware.js"
import UserModel from "../models/userModel.js";
const router = express.Router()

// In protected route we pass the auth middleware created to verify and decode the token.
// creating a protected route
router.get('/profile', auth, (req, res) => {
    console.log(req.body, "request");
    
    res.json({msg:"This is protected user profile route", user:req.user})
})

// non-protected route to get all registered users from db
router.get('/all', async(req, res) =>{
    try{
        const userList = await UserModel.find({})
        res.status(200).json({
            count:userList.length,
            data:userList
        })
    }catch(e){
        res.status(404).json({msg:"Unable to get all users !"})
        
    }
})

export default router;

