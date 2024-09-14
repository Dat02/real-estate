import { json } from 'express'
import UserModel from '../model/user.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../model/user.js'

export const updateUser = async (req,res,next) => {

    console.log('something come to update user api');

    
    if(req.user.id != req.params.id) {
        return next(errorHandler(401, 'you can only update your account'));
    }
    
    try {
        if(req.body.password) req.body.password = bcryptjs.hashSync(req.body.password,10);

        const updateUser = await UserModel.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture
                }
            },
            { new : true}
        );

        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}