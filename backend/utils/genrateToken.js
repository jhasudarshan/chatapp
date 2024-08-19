import jwt from "jsonwebtoken";

const generateAccessTokenAndSetCookie = async (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
		expiresIn: "10d",
	});

	await res.cookie("chatapp-token", token, {
		maxAge: 10 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, //prevent XSS (Cross-Site Scripting) attacks by ensuring the cookie can't be stolen or manipulated via client-side scripts.
		sameSite: "strict", // cookie will only be sent in requests originating from the same site as the server, helping to prevent CSRF (Cross-Site Request Forgery) attacks.
		secure: process.env.WORK_ENV !== "development",
	});
	console.log(`cookie set successfully`);
};

export default generateAccessTokenAndSetCookie;