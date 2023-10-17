'use client'

import Editor from "@/components/Editor"
import Posts from "@/components/Posts"
import { useAppSelector } from '@/redux/store';
import request from "@/services/request";
import { redirect } from 'next/navigation';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCategoriesAction } from '@/redux/slices/postSlice';

function Feed() {
  const { token } = useAppSelector((state) => state.authReducer.value);
  if (!token) redirect('/login');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const headers = { headers: { authorization: `Bearer ${token}` } }
        const categories = await request.getCategories(headers);
        dispatch(setCategoriesAction(categories.data));
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