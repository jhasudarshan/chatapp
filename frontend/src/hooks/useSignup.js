import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import BACKEND_URL from "../constants";


const useSignup = () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs) => {
        const { fullname, username, password, confirmPassword, gender } = inputs;
        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender });
        if( !success){
            return;
        }
        setLoading(true);
        
        try {
            const res = await fetch(`${BACKEND_URL}/chat-app/auth/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
            });

            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);   
        }
    };
    
    return { loading, signup };
}

function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {
    console.log({ fullname, username, password, confirmPassword, gender });
    if (!fullname || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	return true;
}

export default useSignup;