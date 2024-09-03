import axios from 'axios';

// axiosのインスタンスを作成
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // DjangoのAPIのベースURLを指定
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// トークンがあればヘッダーに追加する
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
