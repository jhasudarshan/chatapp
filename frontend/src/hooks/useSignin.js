import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignin =  () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signin = async ({  username, password }) => {
        const success = handleInputErrors({  username, password });
        if( !success){
            return;
        }
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/chat-app/auth/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
				body: JSON.stringify({  username, password })
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

    return { loading, signin };
}

function handleInputErrors({ username, password }) {
    if( !username && !password){
        toast.error("All fields are required")
    }

	return true;
}

export {
    useSignin
}