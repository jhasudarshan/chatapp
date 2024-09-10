import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
	return (
		<div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
			<div className="flex-shrink-0 w-64 sm:w-48 md:w-64 lg:w-72">
				<Sidebar />
			</div>
			<div className="flex-1">
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;
