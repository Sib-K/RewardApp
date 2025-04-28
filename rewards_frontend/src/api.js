import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000'
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Stored token:", localStorage.getItem("token"));
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
  });

export const signup = (userData) => API.post('/signup', { user: userData });
export const login = (userData) => API.post('/login', { user: userData });

const userId = localStorage.getItem("user_id");

export const getBalance = () => API.get(`/api/v1/users/${userId}/balance`);
export const getRewards = () => API.get('/api/v1/rewards');
export const redeemReward = (rewardId) => API.post(`/api/v1/redemptions`, { reward_id: rewardId });
export const getRedemptionHistory = () => API.get(`/api/v1/users/${userId}/redemptions`);
