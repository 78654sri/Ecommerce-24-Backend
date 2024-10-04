import express from "express";
import formidable from "express-formidable";
const router = express.Router();


//middlewares
import { requireSignin ,isAdmin} from "../middlewares/auth.js";

//controllers
import {create,list,read,photo,remove,update} from "../controllers/product.js";



router.post("/product",requireSignin,isAdmin,formidable(),create);  //create
router.put("/product/:productId",requireSignin,isAdmin,formidable(),update);//update
router.delete("/product/:productId",requireSignin,isAdmin, remove);//delete
router.get("/products",list);
router.get("/product/:slug",read);
router.get("/product/photo/:productId",photo);   

export default router;