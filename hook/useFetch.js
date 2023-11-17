import { useState, useEffect } from 'react'
import axios from 'axios'

import { useAuth } from '../utils/AuthContext';

const host = "http://192.168.100.11:8080";

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // query option

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        } finally {
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

    return { data, isLoading, error, refetch };
}

const useFetchLogin = async (username, password) => {
    try {
        // Fetch the CSRF token
        const response = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = response.data.csrfToken;

        // Include the CSRF token in your requests
        const loginResponse = await axios.post(host + '/api/login/',
            JSON.stringify({ username, password }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the token in the request headers
                },
            }
        );

        if (loginResponse.status === 200) {
            // Login successful
            return {data: loginResponse.data, error: null};
        } else {
            // Login failed
            throw {data: null, error: new Error('Login failed')};
        }
    } catch (error) {
        // Handle login error
        return {data: null, error: error};
    }
};

export { useFetch, useFetchLogin };