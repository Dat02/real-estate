import UserModel from '../model/user.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) => {
    
    const {username,email,password} = req.body;

    //hash password
    const saltRound = 10;
    const hashedPassword = bcryptjs.hashSync(password, saltRound);

    //create new user
    const newUser = new UserModel({username,email,password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json({ user: newUser._id});
    
    } catch (error) {
        next(error);
    }
    
};



export const signin = async (req,res,next) => {
    
    const {email,password} = req.body;

    try {
        const validUser = await UserModel.findOne({ email });
        if(!validUser) return next(errorHandler(404,'User not found'));

        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'wrong credentials'));
        // create jwt cookie
        
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: changename, ...rest} = validUser._doc;
        console.log(changename);
        res.cookie('jwt', token, {http: true}).status(200).json(rest);
    
    } catch (error) {
        next(error);
    }
    
};
