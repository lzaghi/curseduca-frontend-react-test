import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const request = {
  login: (credentials: Credentials) => api.post('/auth/login', credentials),
  getPosts: (headers: Header) => api.get('/posts', headers),
  getCategories: (headers: Header) => api.get('/categories', headers),
  getUsers: (headers: Header) => api.get('/users', headers),
  createPost: (body: postBody, headers: Header) => api.post('/posts', body, headers),
  deletePost: (id: number, headers: Header) => api.delete(`/posts/${id}`, headers),
};

export default request;