import jwt from 'jsonwebtoken';
import User from '../models/model.user.js'

export const protect = async (req,res,next) => { 
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(404).json({
                message : "Unothirized no token provided"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({
                message : "token is not valid"
            })
        }

        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(404).json({
                message : "user is not valid"
            })
        }

        req.user = user;
        
        next();

    } catch (error) {

        res.status(400).json({
            message : error.message
        })

    }
}
