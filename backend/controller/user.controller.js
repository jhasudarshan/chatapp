import User from "../model/user.model.js";

const chatUsers = async ( req, res ) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(400).json({error: "Username does not exist"})
        }
        await user.populate("friends");
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

        const connecctUsers = await User.aggregate([
            { $match: { _id: { $nin: excludeUserIds } } }, 
            { $sample: { size: Math.floor(Math.random()*100) } }
        ]).select("-password");
        res.status(201).json(connecctUsers)
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