import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken = (req,res,next) => {
    const token = req.cookies.jwt;

    if(!token) return next(errorHandler(401,'not authenicated'));

    jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
        if(err) return next(errorHandler(403,'token is not valid'));

        req.user = user;
        next();

    });

}