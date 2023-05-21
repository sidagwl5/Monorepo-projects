import axios from 'axios';
import { setInterceptors } from './interceptors';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

setInterceptors(axiosInstance);
