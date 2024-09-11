import UserModel from '../model/user.js';
import bcryptjs from 'bcryptjs'

export const signup = async (req,res) => {
    
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
        res.status(500).json({errors: error})
    }
    
};

