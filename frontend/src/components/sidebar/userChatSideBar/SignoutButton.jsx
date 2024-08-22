import { BiLogOut } from "react-icons/bi";
import { useSignout } from '../../../hooks/useSignout';

const SignOutButton = () => {
	const { loading, signout } = useSignout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-7 h-6 text-white cursor-pointer' onClick={signout}/>
			) : (
				<span className='loading loading-spinner'></span>
			)}
			
		</div>
	);
};
export default SignOutButton;
