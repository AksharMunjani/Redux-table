import axios from 'axios';

const apiClient = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
    };
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers,
    });
    return instance;
};
export default apiClient;