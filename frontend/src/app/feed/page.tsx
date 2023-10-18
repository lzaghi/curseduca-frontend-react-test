'use client'

import Editor from "@/components/Editor"
import Posts from "@/components/PostList"
import { useAppSelector } from '@/redux/store';
import request from "@/services/request";
import { useRouter, redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCategoriesAction, setPostsAction, setUsersAction } from '@/redux/slices/feedSlice';

function Feed() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { token } = useAppSelector((state) => state.authReducer.value);
  if (!token) redirect('/login');

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const headers = { headers: { authorization: `Bearer ${token}` } }
        const posts = await request.getPosts(headers);
        const categories = await request.getCategories(headers);
        const users = await request.getUsers(headers);
        dispatch(setPostsAction(posts.data.reverse()));
        dispatch(setCategoriesAction(categories.data));
        dispatch(setUsersAction(Object.values(users.data)));
      } catch (error: any) {
        setLoading(false);
        if (error.response.data.status === 401) {
          push('/login');
        }
        setError(error.response.data.message || 'Internal error');
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, [token, dispatch, push])

  if (error) return <p>{ error }</p>
  
  return (
    <main>
      {
        loading ? <p>Loading...</p> : (
          <>
            <Editor />
            <Posts />
          </>
        )
      }
    </main>
  )
}

export default Feed