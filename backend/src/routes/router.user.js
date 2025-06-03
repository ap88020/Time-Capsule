import express from "express";
import  {register,login,logout, updateProfile}  from '../controllers/auth.controller.js';
import  { protect }  from "../middleware/auth.middleware.js";

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.put('/profile-image',protect,updateProfile);

export default router;