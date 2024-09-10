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
		<div className="border-r border-slate-500 p-4 flex flex-col h-full min-w-[250px] sm:min-w-[200px] lg:min-w-[250px]">
  <SearchInput />
  <div className="divider px my-4"></div>
  <div className="overflow-y-auto flex-1">
    <Chats />
  </div>
  <div className="flex flex-col space-y-3 mt-4">
    <GrAdd className="w-8 h-6 text-white cursor-pointer" onClick={handleChatComponent} />
    <SignOutButton />
  </div>
</div>
	);
};

export default UserSidebar;