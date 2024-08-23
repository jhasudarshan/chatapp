import { useState } from "react";
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";
import BACKEND_URL from "../constants";
import axios from "axios";

const useSignout =  () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/chat-app/auth/signout`, {}, {
                headers: { "Content-Type": "application/json" }
            });
            
            //const data = await res.json();
            const data = await res.data;
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
			setAuthUser(null);
        }catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
    };

    return { loading, signout };
}

export {
    useSignout
}