import express from "express";

const router = express.Router();
import { register } from "../controllers/authControllers.js";
import {login,secret} from "../controllers/authControllers.js"

//middlewares
import { requireSignin ,isAdmin} from "../middlewares/auth.js";


router.post("/register",register);
router.post("/login",login);
router.get("/auth-check" , requireSignin, (req,res)=>{

    res.json({ok:true});

});
router.get("/admin-check" , requireSignin, isAdmin, (req,res)=>{

    res.json({ok:true});

});
//test
router.get("/secret", requireSignin,isAdmin,secret)

export default router;