import UserSidebar from "./userChatSideBar/UserSidebar";
import ConnectUserSidebar from "./ConnectChatsSideBar/ConnectUserSidebar";
import useComponent from "../../zustand/useComponent";

const Sidebar = () => {
const { component } = useComponent();
  
  if(!component){
    return <div>
		<span className='loading loading-spinner mx-auto'></span>
	</div>
  }
  return (<div>
    {component === 'UserChats' ? 
		<UserSidebar/> : 
		<ConnectUserSidebar/>}
  </div>
  )
};

export default Sidebar;