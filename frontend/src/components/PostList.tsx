'use client'

import { setPostsAction } from '@/redux/slices/feedSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import request from '@/services/request';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Post from './Post';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostList() {
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    author: '',
    category: '',
  })

  const { token } = useAppSelector(state => state.authReducer.value);
  const { posts, categories, users } = useAppSelector((state) => state.postsReducer.value);

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    })
  }

  const filterPosts = (posts: Post[]) => {
    let filteredPosts = posts;
    if (filter.author) {
      filteredPosts = filteredPosts.filter((post: Post) => post.id_user === Number(filter.author));
    }
    if (filter.category) {
      filteredPosts = filteredPosts.filter((post: Post) => post.id_category === Number(filter.category));
    }
    return filteredPosts;
  }

  const deletePost = async (id: number) => {
    try {
      const headers = { headers: { authorization: `Bearer ${token}` } }
      await request.deletePost(id, headers);

      const updatedPosts = await request.getPosts(headers);
      dispatch(setPostsAction(updatedPosts.data.reverse()));
      toast.success('Post deleted');
    } catch (error: any) {
      if (error?.response?.data?.status === 401) {
          push('/login');
        }
      toast.error(error?.response?.data?.message || 'Internal error');
    }
  }

  if (error) return <p>{ error }</p>

  return (
    <section>
      <h1>Posts</h1>
      <section>
        <label htmlFor='category'>Category</label>
        <select
          name='category'
          onChange={handleFilterChange}
        >
          <option value=''>All</option>
          {
            categories.map((category: Category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
        </select>

        <label htmlFor='author'>Author</label>
        <select
          name='author'
          onChange={handleFilterChange}
        >
          <option value=''>All</option>
          {
            users
              .map((user: User) => (
              <option
                key={user.email}
                value={user.id}
              >
                Dev {user.id}
              </option>
            ))
          }
        </select>
      </section>
      <section>
        {
          filterPosts(posts).map((post: Post) => (
            <Post key={post.id} post={post} deletePost={deletePost} />
          ))
        }
      </section>  
      <ToastContainer />    
    </section>
  )
}

export default PostList;