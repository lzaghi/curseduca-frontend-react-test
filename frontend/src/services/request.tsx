import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const request = {
  login: (credentials: {email: string, password: string}) => api.post('/auth/login', credentials),
};

export default request;