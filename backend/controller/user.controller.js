import User from "../model/user.model.js";

const chatUsers = async ( req, res ) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(400).json({error: "Username does not exist"})
        }
        await user.populate({
            path: "friends",
            select: "_id fullname username profilePic gender"
        });
        const connectedUsers = user.friends;
        res.status(200).json(connectedUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

const usersToConnect = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({error: "Username does not exist"})
        }

        const excludeUserIds = user.friends.concat(user._id);

        const connectUsers = await User.aggregate([
            { $match: { _id: { $nin: excludeUserIds } } },
            {$project: {
                fullname: 1,username: 1,_id: 1,profilePic: 1,gender: 1
            }}
        ]);
        res.status(201).json(connectUsers);
    } catch (error) {
        console.error("Error in usersToConnect Controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

const searchUsers = async (req, res) => {
    try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in searchUsers Controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

export {
    chatUsers,
    usersToConnect,
    searchUsers
}