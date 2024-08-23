import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import BACKEND_URL from "../constants";

const useGetConnectChats = () => {
    const [ loading, setLoading ] = useState(false);
    const [ chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BACKEND_URL}/users/users-to-connect`);

                const data = await res.data;
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