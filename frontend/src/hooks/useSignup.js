import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
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
            console.log("working");
            const res = await axios.post(`${BACKEND_URL}/chat-app/auth//signup`, {
                fullname,
                username,
                password,
                confirmPassword,
                gender
            }, {
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.data; // Ensure you get the correct data

            // Assuming res.data contains a 'token' and other user data
            console.log("API Response:", data);

            if (data.error) {
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
    if (!fullname || !username || !password || !confirmPassword || !gender) {
		alert("all fields are required");
		return false;
	}

	if (password !== confirmPassword) {
		alert("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		alert("Password must be at least 8 characters");
		return false;
	}

	return true;
}

export default useSignup;