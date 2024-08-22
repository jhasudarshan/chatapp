import { useState, useEffect } from "react"
import toast from "react-hot-toast";

const useGetConnectChats = () => {
    const [ loading, setLoading ] = useState(false);
    const [ chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BACKEND_URL}/users/users-to-connect`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setChats(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        };

        getChats();
    },[]);

    return { loading, chats };
};

export {
    useGetConnectChats
}