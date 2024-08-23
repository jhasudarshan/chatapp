import SearchInput from "./SearchInput";
import SignOutButton from "./SignoutButton";
import Chats from "./Chats";
import useComponent from "../../../zustand/useComponent";
import { GrAdd } from "react-icons/gr";
import { useGetChats } from "../../../hooks/useGetChats";

const UserSidebar = () => {
	const { component, setComponent } = useComponent();
	const {loading} = useGetChats();
  
  const handleChatComponent = () => {
    setComponent(component === 'UserChats' ? 'ConnectOtherUsers' : 'UserChats');
  };
  if(!component){
    return <div>
      
    </div>
  }
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col '>
			<SearchInput />
			<div className='divider px'></div>
			<div className="overflow-y-scroll">
				<Chats />
			</div>
			<div className="flex flex-col space-y-3">
  				<GrAdd className="w-8 h-6 text-white cursor-pointer" onClick={handleChatComponent} />
  				<SignOutButton />
			</div>
		</div>
	);
};

export default UserSidebar;