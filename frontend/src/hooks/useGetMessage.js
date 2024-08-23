import { useEffect, useState } from "react";
import { useChat } from "../zustand/useChat";
import toast from "react-hot-toast";
import axios from "axios";
import BACKEND_URL from "../constants";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedChat } = useChat();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`${BACKEND_URL}/message/${selectedChat._id}`);
			
				
				const data = await res.data;
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedChat?._id) getMessages();
	}, [selectedChat?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;