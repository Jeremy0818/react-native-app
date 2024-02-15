import axios from 'axios';
import { getToken, storeToken, removeToken, checkAuthToken } from './TokenManager';

import { host } from '../constants';

export const getUserInfo = async () => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        // Send the POST request to refresh the token
        const response = await axios.get(host + '/api/get-user/', {
            headers: customHeaders,
        });

        // Handle the response data here
        console.log(response.data.user);

        return response.data.user; // Return the new access token
    } catch (error) {
        // Handle token refresh failure
        console.log(error);
        throw error;
    }
};

export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        // Add the captured image data to the form data
        formData.append('image', image);

        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.post(host + '/api/ocr/', formData, {
            headers: customHeaders,
        });
        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const saveNewTransactions = async (transactions) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.post(host + '/api/transaction/', transactions, {
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const updateTransaction = async (id, transaction) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.post(host + '/api/transaction/' + id + '/', transaction, {
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const deleteTransaction = async (id, transaction) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.delete(host + '/api/transaction/' + id + '/', {
            data: transaction,
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const newAccount = async (accName, balance) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        // Include the CSRF token in your requests
        const response = await axios.post(host + '/api/account/',
            JSON.stringify({ "account_name": accName, "balance": balance }),
            {
                headers: customHeaders,
            }
        );

        if (response.status === 200) {
            // Login successful
            return { data: response.data, error: null };
        } else {
            // Login failed
            throw { data: null, error: new Error('Create new account failed') };
        }
    } catch (error) {
        return { data: null, error: error };
    }
}

export const getAllAccount = async () => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.get(host + '/api/account/', {
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const getAccount = async (id) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.get(host + '/api/account/' + id + '/', {
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const updateAccountDetails = async (id, name, balance) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.put(host + '/api/account/' + id + '/', 
        JSON.stringify({ "account_name": name, "balance": balance }), 
        {
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const deleteAccount = async (id) => {
    try {
        // First, obtain the CSRF token
        const csrfResponse = await axios.get(host + '/api/get-csrf-token/');
        const csrfToken = csrfResponse.data.csrfToken;

        const { token, refreshToken } = await getToken();

        // Create custom headers with the refresh token and CSRF token
        const customHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        };

        const response = await axios.delete(host + '/api/account/' + id + '/',
        {
            headers: customHeaders,
        });

        const data = response.data;

        if (data.error) {
            console.log(data.error);
            return { data: null, error: data.error };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

export const login = async (username, password) => {
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
            return { data: loginResponse.data, error: null };
        } else {
            // Login failed
            throw { data: null, error: new Error('Login failed') };
        }
    } catch (error) {
        // Handle login error
        return { data: null, error: error };
    }
};