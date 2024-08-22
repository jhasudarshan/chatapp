import express from 'express';
import http from "http";
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from './db/connectDatabase.js';
import cookieParser from 'cookie-parser';
import { connectSocket } from './socketIO/socket.js';

const app = express();
const server = http.createServer(app);

const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use('/chat-app/auth',authRoutes);
app.use('/message',messageRoutes);
app.use('/users',userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, async() => {
    await connectDB();
    connectSocket(server);
    console.log(`Server is running at ${PORT}`);
})

export {
    app
}