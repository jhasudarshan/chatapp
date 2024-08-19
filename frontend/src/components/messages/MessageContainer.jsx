import { useEffect } from "react";
import { useChat } from "../../zustand/useChat";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
	const { selectedChat, setSelectedChat} = useChat();
	const {authUser} = useAuthContext();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedChat(null);
	}, [setSelectedChat]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedChat ? (
				<NoChatSelected authUser={authUser}/>
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>From:</span>{" "}
					<span className='text-gray-900 font-bold'>{authUser.fullname}</span>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedChat.fullname}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

const NoChatSelected = ({authUser}) => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullname} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};


export default MessageContainer;