import { useGetConnectChats } from "../../../hooks/useGetConnectChats";
import { getRandomEmoji } from "../../../utils/randomEmoji";
import Chat from "./Chat";

const UserChats = () => {
	const { loading, chats } = useGetConnectChats();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{chats.map((chat, idx) => {
				return (
					<Chat
						key={chat._id}
						chat={chat}
						emoji={getRandomEmoji()}
						lastIdx={idx === chat.length - 1}
					/>
				);
			})}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};

export default UserChats;