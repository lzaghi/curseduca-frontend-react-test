'use client'

import Editor from "@/components/Editor"
import Posts from "@/components/Posts"
import { useAppSelector } from '@/redux/store';
import request from "@/services/request";
import { redirect } from 'next/navigation';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCategoriesAction, setPostsAction, setUsersAction } from '@/redux/slices/feedSlice';

function Feed() {
  const { token } = useAppSelector((state) => state.authReducer.value);
  if (!token) redirect('/login');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const headers = { headers: { authorization: `Bearer ${token}` } }
        const posts = await request.getPosts(headers);
        const categories = await request.getCategories(headers);
        const users = await request.getUsers(headers);
        dispatch(setPostsAction(posts.data.reverse()));
        dispatch(setCategoriesAction(categories.data));
        dispatch(setUsersAction(Object.values(users.data)));
      } catch (error: any) {
        console.log(error)
      } 
    }
    fetchPosts();
  }, [token, dispatch])
  
  return (
    <main>
      <Editor />
      <Posts />
    </main>
  )
}

export default Feed