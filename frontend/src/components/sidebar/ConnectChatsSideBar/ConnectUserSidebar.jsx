import SearchInput from "./SearchInput";
import Chats from "./Chats";


const ConnectUserSidebar = () => {
	
	return (
		<div className="border-r border-slate-500 p-4 flex flex-col h-full min-w-[250px] sm:min-w-[200px] lg:min-w-[250px]">
			<SearchInput />
			<div className="divider px-3 my-4"></div>
			<div className="flex-1 overflow-y-auto">
				<Chats />
			</div>
		</div>
	);
};

export default ConnectUserSidebar;