import SearchInput from "./SearchInput";
import Chats from "./Chats";


const ConnectUserSidebar = () => {
	
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Chats />
		</div>
	);
};

export default ConnectUserSidebar;