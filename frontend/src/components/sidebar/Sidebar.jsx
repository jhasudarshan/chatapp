import SearchInput from "./SearchInput";
import Chats from "./Chats";
import SignOutButton from "./SignoutButton";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Chats />
			<SignOutButton />
		</div>
	);
};

export default Sidebar;