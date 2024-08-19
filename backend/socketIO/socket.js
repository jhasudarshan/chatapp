import { Server } from "socket.io";

let io;
const userSocketMap = {};
const connectSocket = (server) => {
	io = new Server(server,{
		cors : {
			origin : process.env.FRONTEND_URL,
			credentials : true
		}
	})

	io.on("connection", (socket) => {
		console.log("a user connected", socket.id);
	
		const userId = socket.handshake.query.userId;
		
		if (userId != "undefined") userSocketMap[userId] = socket.id;
	
		// io.emit() is used to send events to all the connected clients
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	
		// socket.on() is used to listen to the events. can be used both on client and server side
		socket.on("disconnect", () => {
			console.log("user disconnected", socket.id);
			delete userSocketMap[userId];
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		});
	});
}

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};




export {
	connectSocket,
	getReceiverSocketId,
	io
 };