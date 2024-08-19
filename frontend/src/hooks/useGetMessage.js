import { useEffect, useState } from "react";
import { useChat } from "../zustand/useChat";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedChat } = useChat();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				console.log(selectedChat._id);
				const res = await fetch(`/api/message/${selectedChat._id}`,{
					method: 'GET',
				});
				const data = await res.json();
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