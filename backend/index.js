import express from 'express';
import http from "http";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from './db/connectDatabase.js';
import cookieParser from 'cookie-parser';
import { connectSocket } from './socketIO/socket.js';

const app = express();
const server = http.createServer(app);

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use('/chat-app',authRoutes);
app.use('/message',messageRoutes);
app.use('/users',userRoutes);

server.listen(PORT, async() => {
    await connectDB();
    connectSocket(server);
    console.log(`Server is running at ${PORT}`);
})

export {
    app
}