import axios from 'axios';
import { TCredentials, THeader, TpostBody } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const request = {
  login: (credentials: TCredentials) => api.post('/auth/login', credentials),
  getPosts: (headers: THeader) => api.get('/posts', headers),
  getCategories: (headers: THeader) => api.get('/categories', headers),
  getUsers: (headers: THeader) => api.get('/users', headers),
  createPost: (body: TpostBody, headers: THeader) => api.post('/posts', body, headers),
  deletePost: (id: number, headers: THeader) => api.delete(`/posts/${id}`, headers),
};

export default request;
