import UserModel from '../model/user.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const saltRound = 10;

export const signup = async (req,res,next) => {
    
    const {username,email,password} = req.body;

    try {
        //hash password
        
        const hashedPassword = bcryptjs.hashSync(password, saltRound);

        //create new user
        const newUser = new UserModel({username,email,password: hashedPassword});
        await newUser.save();
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
        const {password: changename, ...rest} = newUser._doc;
        res.cookie('jwt', token, {http: true}).status(200).json(rest);

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
        res.cookie('jwt', token, {http: true}).status(200).json(rest);
    
    } catch (error) {
        next(error);
    }

};


export const google = async (req,res,next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.cookie('jwt', token, {http: true}).status(200).json(rest);
            
        }
        else {
            const generatedPassword = Math.random.toString(30).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,saltRound);
            const newUser  = new UserModel({
                email: req.body.email,
                password: hashedPassword,
                username: req.body.name.split(" ").join("").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') + Math.floor((Math.random() * 10000)).toString(),
                profilePicture: req.body.photo
            });

            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.cookie('jwt', token, {http: true}).status(200).json(rest);
        }
    } 
    catch (error) {
        console.log(error);
        next(error);
    }
};
    
export const signout = (req,res) => {
    res.clearCookie('jwt');
    res.status(200).json('sign out success');
}
