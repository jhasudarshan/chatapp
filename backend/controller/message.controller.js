import Chat from "../model/chat.model.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import { getReceiverSocketId, io } from "../socketIO/socket.js";

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId} = req.params;
        const sender = req.user;
        const senderId = sender._id;

        let chat = await Chat.findOne({
            members: { $all: [senderId, receiverId]}
        });

        if(!chat){
            chat = await Chat.create({
                members: [senderId, receiverId],
            });
            const receiver = await User.findById(receiverId);
            sender.friends.push(receiverId);
            await sender.save();
            receiver.friends.push(senderId);
            await receiver.save();
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            chat.messages.push(newMessage._id);
        }

        //It will save both the Schema Parallely
        await Promise.all([chat.save(),newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        //socket IO Functionality


        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const sender = req.user;
        const senderId = sender._id;
        
        let chat = await Chat.findOne({
            members: { $all: [senderId, receiverId] }
        }).populate("messages");

        if( !chat ) {
            chat = await Chat.create({
                members: [senderId, receiverId],
            });
            const receiver = await User.findById(receiverId);
            sender.friends.push(receiverId);
            await sender.save();
            receiver.friends.push(senderId);
            await receiver.save();
        }

        const message = chat.messages;
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

export {
    sendMessage,
    getMessages
}