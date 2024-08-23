import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import BACKEND_URL from "../constants";

const useSignin =  () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signin = async ({  username, password }) => {
        const success = handleInputErrors({  username, password });
        if( !success){
            return;
        }
        setLoading(true);
        console.log("working");
        try {
            const res = await axios.post(`${BACKEND_URL}/chat-app/auth/signin`, {
                username,
                password
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
            await setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);   
        }
    };

    return { loading, signin };
}

function handleInputErrors({ username, password }) {
    if( !username && !password){
        alert('all field are required');
        return false;
    }

	return true;
}

export {
    useSignin
}