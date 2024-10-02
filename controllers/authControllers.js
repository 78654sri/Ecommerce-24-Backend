import User from "../models/user.js"; 

import { hashPassword,comparePassword } from "../helper/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req,res)=>{
    try{
        // 1. destructure name,email,password from req.body
        const {name,email,password} = req.body;
        // 2. all fields require validation
        if(!name.trim()){
            return res.json({error:"Name is required"});
        }
        if(!email){
            return res.json({error:"Email is required"})
        }
        if(!password || password.length<6){
            return res.json({error:"password must be at least 6 characters long"});
        }
        // 3. check if the email is unique
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({error:"Email is taken"})
        }
        // 4. now has the password
        const hashedPassword = await hashPassword(password)
        // 5. register user
        const user =  await new User({name,email,password:hashedPassword}).save();
        // 6. create signed jwt token
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"20d"})
        // 7. send responce
        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                address:user.address,
            },
            token
        });

    }catch(err){
        console.log(err);

    }
};

export const login = async (req,res)=>{
    try{
        // 1. destructure name,email,password from req.body
        const {email,password} = req.body;
        // 2. all fields require validation
        if(!email){
            return res.json({error:"Email is required"})
        }
        if(!password || password.length<6){
            return res.json({error:"password must be at least 6 characters long"});
        }
        // 3. check if the email is unique
        const user = await User.findOne({email});
        if(!user){
            return res.json({error:"User is not found"})
        }
        // 4. compare password
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.json({error:"wrong password"});
        }
      
        // 6. create signed jwt token
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"20d"})

        // 7. send responce
        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                address:user.address,
            },
            token
        });

    }catch(err){
        console.log(err);

    }
};

export const secret = async (req,res)=>{
    res.json({curreuser:req.user});
};