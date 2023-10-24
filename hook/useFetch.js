import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'ae83979f28msh5f03df2b15bf4f4p11ebd9jsn07a98fd26d21',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };
    
    const fetchData = async () => {
        setIsLoading(true);
        
        try {
            const response = await axios.request(options);
            setData(response.data.data);
        }catch (error) {
            setError(error);
            alert('Il y a une erreur');
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch}
}

export default useFetch;