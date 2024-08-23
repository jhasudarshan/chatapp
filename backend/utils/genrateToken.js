import jwt from "jsonwebtoken";

const generateAccessTokenAndSetCookie = async (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
		expiresIn: "10d",
	});

	await res.cookie("chatapp-token", token, {
		maxAge: 10 * 24 * 60 * 60 * 1000,
    	httpOnly: true,
    	sameSite: "strict",
    	secure: process.env.NODE_ENV === "production",
	});
	console.log('cookies set successfully');
};

export default generateAccessTokenAndSetCookie;