import { useChat } from "../../zustand/useChat";


const Chat = ({chat, lastIdx, emoji}) => {

	const { selectedChat, setSelectedChat } = useChat();

	const isSelected = selectedChat?._id === chat._id;

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedChat(chat)}
			>
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img src={chat.profilePic} alt='user avatar'/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{chat.fullname}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Chat;