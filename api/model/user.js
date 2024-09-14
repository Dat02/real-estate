import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://drive.google.com/file/d/1bynShAckJ9NH3uk1juaM7yQqlEztJ0u6/view?usp=sharing"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;