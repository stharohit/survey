import axios from 'axios';

export const weatherInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});