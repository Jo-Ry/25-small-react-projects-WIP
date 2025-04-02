import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
    // states for handling the api call
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        // fetch data
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(url);
                const result = (await response.json()) as T;
    
                if (result) {
                    setData(result);
                    setIsLoading(false);
                }
            } catch (error) {
                setErrorMsg(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        };

        fetchData();
    }, [url]);

    return { data, errorMsg, isLoading };
};

export default useFetch