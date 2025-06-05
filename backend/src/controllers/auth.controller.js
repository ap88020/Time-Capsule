import User from '../models/model.user.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../config/utils/utils.js';
import cloudinary from '../config/cloudinary/cloudinary.js';

export const register = async (req,res) => {
    const {name, email , password } = req.body;
    try {
        if(!name || !email){
            res.status(400).send({message : "name and email are required"});
            return;
        }   
        const user = await User.findOne({email});

        if(user){
            res.status(402).send({
                message : "user already exists"
            })
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt) ;

        const newUser = await User.create({
            name,
            email,
            password : hashPassword,
        })

        res.status(200).json({
            newUser
        })
    } catch (error) {
        res.status(403).send({
            message : error.message,
        })
    }
}

export const login = async (req,res) => {
    const {email , password} = req.body;
    try {
        if(!email || !password){
            res.status(404).send({message : "email and password are required"});
            return;
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(400).send({message : "user does not exist please signIn"});
            return;
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.status(403).send({message : "wrong password"});
            return;
        }
        generateToken(user._id , res);
        res.status(200).send({
            message : user
        })
    } catch (error) {
        res.status(403).send({
            error : error.message
        })
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie("token","",{maxAge:0});
        res.status(200).json({message : "Logout successfull"});
    } catch (error) {
        res.status(400).json({
            error : error.message
        })
    }
}

export const updateProfile = async (req,res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        
        if(!profilePic){
            return res.status(400).json({
                message : "image is required",
            })
        }
        console.log(userId);

        if(!userId){
            return res.status(400).json({
                message : "userId is required"
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // console.log("Upload success:", uploadResponse);

        
        const updatedUser = await User.findByIdAndUpdate(userId,
            {profileUrl : uploadResponse.secure_url},
            {new : true}
        );

        res.status(200).json({
            updatedUser
        })


    } catch (error) {
        res.status(400).json({
            error : error.message
        })
    }
}

export const checkAuth = async (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(400).json({
            message : "Internal server error"
        });
    }
}