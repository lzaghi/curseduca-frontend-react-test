'use client';

import { useRouter, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Editor from '../../components/Editor';
import PostList from '../../components/PostList';
import { useAppSelector, AppDispatch } from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { fetchFeed } from '../../services/fetch';

function Feed() {
  const [loading, setLoading] = useState(false);

  const { token } = useAppSelector((state) => state.authReducer.value);
  if (!token) redirect('/login');

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        fetchFeed(dispatch, token);
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
    fetchData();
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
