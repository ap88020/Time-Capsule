import jwt from 'jsonwebtoken';

export const generateToken = async (userId , res) => {
    const token = jwt.sign(
        {id : userId},
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )

    res.cookie('token' , token , {
        httpOnly : true,
        secure : true,
        maxAge : 1 * 24 * 60 * 60 * 1000,
    })

    return token;
}