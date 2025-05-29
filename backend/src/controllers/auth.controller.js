import User from '../models/model.user.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../config/utils/utils.js';

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
