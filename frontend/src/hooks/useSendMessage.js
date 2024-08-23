import { useState } from "react";
import { useChat } from "../zustand/useChat";
import toast from "react-hot-toast";
import axios from "axios";
import BACKEND_URL from "../constants";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedChat } = useChat();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await axios.post(`${BACKEND_URL}/message/send/${selectedChat._id}`, {
				message
			}, {
				headers: {
					"Content-Type": "application/json",
				}
			});
			//const data = await res.json();
			const data = await res.data;
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
