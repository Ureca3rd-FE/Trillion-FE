import axios, { InternalAxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// TODO : 동적 토큰
/*
api.interceptors.request.use((config) => {
  const token = localStrorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 에러 메세지
    const messgae = error.response?.data?.message || error.message;

    if (error.response?.status === 401) {
      // TODO : 로그아웃 처리
    }

    return Promise.reject(new Error(messgae));
  }
);
export default api;
