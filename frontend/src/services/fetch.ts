import request from './request';
import { loginAction } from '../redux/slices/authSlice';
import { setCategoriesAction, setPostsAction, setUsersAction } from '../redux/slices/feedSlice';
import { TCredentials } from '../types/types';
import { AppDispatch } from '../redux/store';

export const fetchToken = async (dispatch: AppDispatch, user: TCredentials) => {
  const { data } = await request.login(user);
  dispatch(loginAction({ token: data.access_token, email: user.email }));
};

export const fetchPosts = async (dispatch: AppDispatch, token: string) => {
  const headers = { headers: { authorization: `Bearer ${token}` } };
  const { data } = await request.getPosts(headers);
  dispatch(setPostsAction(data.reverse()));
};

export const fetchCategories = async (dispatch: AppDispatch, token: string) => {
  const headers = { headers: { authorization: `Bearer ${token}` } };
  const { data } = await request.getCategories(headers);
  dispatch(setCategoriesAction(data));
};

export const fetchUsers = async (dispatch: AppDispatch, token: string) => {
  const headers = { headers: { authorization: `Bearer ${token}` } };
  const { data } = await request.getUsers(headers);
  dispatch(setUsersAction(Object.values(data)));
};

export const fetchFeed = async (dispatch: AppDispatch, token: string) => {
  fetchPosts(dispatch, token);
  fetchCategories(dispatch, token);
  fetchUsers(dispatch, token);
};
