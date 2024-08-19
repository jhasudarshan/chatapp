import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const validateRoute = async (req, res, next) => {
    try {
        const token = req.cookies['chatapp-token'];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token does not exist" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in validateRoute middleware: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    validateRoute
}