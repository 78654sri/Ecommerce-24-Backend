import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters long'],   
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0, 
    },
},{timestamps:true});


const User = mongoose.model("User", userSchema);
export default User;
