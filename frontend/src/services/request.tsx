import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

type Credentials = {
  email: string,
  password: string
}

type Headers = {
  headers: {
    authorization: string
  }
}

const request = {
  login: (credentials: Credentials) => api.post('/auth/login', credentials),
  getPosts: (headers: Headers) => api.get('/posts', headers),
  getCategories: (headers: Headers) => api.get('/categories', headers),
  getUsers: (headers: Headers) => api.get('/users', headers),
};

export default request;