import { useEffect, useState } from "react";
import { IoSearchSharp, IoArrowBack } from "react-icons/io5";
import { useChat } from "../../../zustand/useChat";
import { useGetConnectChats } from "../../../hooks/useGetConnectChats";
import toast from "react-hot-toast";
import useComponent from "../../../zustand/useComponent";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedChat } = useChat();
	const  { searchChats } = useGetConnectChats();
	const { component, setComponent } = useComponent();

	const handleChatComponent = () => {
		setComponent(component === 'UserChats' ? 'ConnectOtherUsers' : 'UserChats');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!search) return;
		if(search.length < 3){
			return alert("Search term must be at least 3 characters long");
		}

		const searchChat = searchChats.find((c) => c.fullname.toLowerCase().includes(search.toLocaleLowerCase()));
		
		if(searchChat) {
			setSelectedChat(searchChat);
			setSearch("");
		}else{
			alert("No such user Exist!");
		}
	}
	
	return (
		<div className="flex gap-2">
			<button className='btn btn-circle bg-sky-500 text-white' onClick={handleChatComponent} >
				<IoArrowBack  className='w-6 h-6 outline-none'  />
			</button>
			<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input 
				type='text' 
				placeholder='Search to Connect User...' 
				className='input input-bordered rounded-full' 
				value={search}
				onChange={(e) => {setSearch(e.target.value)}}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
		</div>
		
	);
};
export default SearchInput;