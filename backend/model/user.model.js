import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    gender: {
        type: String,
        require: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref:"User"
    }]
},{ timestamps: true })

const User = mongoose.model( "User" , userSchema );

export default User;