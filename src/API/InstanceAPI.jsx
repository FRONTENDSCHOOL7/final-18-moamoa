import axios from 'axios'

const BASE_URL = 'https://api.mandarin.weniv.co.kr';
const token = localStorage.getItem('token');

// default 인스턴스
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// image 인스턴스
export const imageInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


// auth 인스턴스
export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (config.headers.Authorization.includes('null')) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.log(error.message);
    return Promise.reject(error);
  }
);
