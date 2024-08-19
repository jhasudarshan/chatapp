import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
},{ timeseries: true });

const Chat = mongoose.model( "Chat" , chatSchema )

export default Chat;