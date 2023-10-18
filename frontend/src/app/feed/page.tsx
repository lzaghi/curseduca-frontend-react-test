'use client';

import { useRouter, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Editor from '../../components/Editor';
import PostList from '../../components/PostList';
import { useAppSelector, AppDispatch } from '../../redux/store';
import request from '../../services/request';
import { setCategoriesAction, setPostsAction, setUsersAction } from '../../redux/slices/feedSlice';
import 'react-toastify/dist/ReactToastify.css';

function Feed() {
  const [loading, setLoading] = useState(false);

  const { token } = useAppSelector((state) => state.authReducer.value);
  if (!token) redirect('/login');

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const headers = { headers: { authorization: `Bearer ${token}` } };
        const posts = await request.getPosts(headers);
        const categories = await request.getCategories(headers);
        const users = await request.getUsers(headers);
        dispatch(setPostsAction(posts.data.reverse()));
        dispatch(setCategoriesAction(categories.data));
        dispatch(setUsersAction(Object.values(users.data)));
      } catch (error: any) {
        setLoading(false);
        if (error?.response?.data?.status === 401) {
          push('/login');
        }
        toast.error(error?.response?.data?.message || 'Internal error');
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [token, dispatch, push]);

  return (
    <main>
      {
        loading ? <p>Loading...</p> : (
          <>
            <Editor />
            <PostList />
          </>
        )
      }
      <ToastContainer />
    </main>
  );
}

export default Feed;
