import { useState, useEffect } from "react"
import toast from "react-hot-toast";

const useGetSearchChats = () => {
    const [ loading, setLoading ] = useState(false);
    const [ searchChats, setSearchChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users/search");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setSearchChats(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        };

        getChats();
    },[]);

    return { loading, searchChats };
};

export {
    useGetSearchChats
}