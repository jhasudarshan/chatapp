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
		<div className='md:min-w-[450px] flex flex-col h-full'>
		{!selectedChat ? (
			<NoChatSelected authUser={authUser} />
		) : (
			<>
			{/* Header */}
			<div className='bg-slate-500 px-4 py-2 mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex flex-col sm:flex-row sm:items-center'>
				<span className='label-text text-xs sm:text-sm md:text-base'>From:</span>{" "}
				<span className='text-gray-900 font-bold text-xs sm:text-sm md:text-base'>{authUser.fullname}</span>
				</div>
				<div className='flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0'>
				<span className='label-text text-xs sm:text-sm md:text-base'>To:</span>{" "}
				<span className='text-gray-900 font-bold text-xs sm:text-sm md:text-base'>{selectedChat.fullname}</span>
				</div>
			</div>
			{/* Messages */}
			<div className='flex-1 overflow-y-auto p-4'>
				<Messages />
			</div>
			{/* Message Input */}
			<div className='p-4'>
				<MessageInput />
			</div>
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