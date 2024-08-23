import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import generateAccessTokenAndSetCookie from "../utils/genrateToken.js";

const signup = async (req, res) => {
    try {
        const {fullname, username, password, gender} = req.body;

        const user = await User.findOne({ username });

        if( user ){
            return res.status(400).json({error: "Username already exist"})
        }

        //hash the original password before saving
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if(newUser) {
            //Generate JWT access token and set cookie
            generateAccessTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }else{
            res.status(400).json({error: "Invalid User Data"});
        }
    } catch (error) {
        console.error("Error in signup Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const signin = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({ username });
        if( !user ){
            return res.status(400).json({error: "Username does not exist"})
        }
        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if( !isPasswordCorrect ){
            return res.status(400).json({error: "Password is Incorrect"});
        }

        generateAccessTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Error in signin Controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const signout = async (req, res) => {
    try {
        res.cookie("chatapp-token", "", { maxAge: 0 });
        res.status(200).json({message: "Signed Out successfully"});
    } catch (error) {
        console.error("Error in signout controller",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export {
    signup,
    signin,
    signout
}