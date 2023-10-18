'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { setPostsAction } from '../redux/slices/feedSlice';
import { AppDispatch, useAppSelector } from '../redux/store';
import request from '../services/request';
import Post from './Post';
import 'react-toastify/dist/ReactToastify.css';
import { TPost, TCategory, TUser } from '../types/types';

function PostList() {
  const [filter, setFilter] = useState({
    author: '',
    category: '',
  });

  const { token } = useAppSelector((state) => state.authReducer.value);
  const { posts, categories, users } = useAppSelector((state) => state.postsReducer.value);

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const filterPosts = (posts: TPost[]) => {
    let filteredPosts = posts;
    if (filter.author) {
      filteredPosts = filteredPosts.filter((post: TPost) => post.id_user === +filter.author);
    }
    if (filter.category) {
      filteredPosts = filteredPosts.filter((post: TPost) => post.id_category === +filter.category);
    }
    return filteredPosts;
  };

  const deletePost = async (id: number) => {
    try {
      const headers = { headers: { authorization: `Bearer ${token}` } };
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
  };

  return (
    <section>
      <label htmlFor="category">
        Category
        <select
          name="category"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {
          categories.map((category: TCategory) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))
        }
        </select>
      </label>
      <label htmlFor="author">
        Author
        <select
          name="author"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {
          users
            .map((user: TUser) => (
              <option
                key={user.email}
                value={user.id}
              >
                Dev
                {' '}
                {user.id}
              </option>
            ))
        }
        </select>
      </label>
      {
        filterPosts(posts).map((post: TPost) => (
          <Post key={post.id} post={post} deletePost={deletePost} />
        ))
      }
      <ToastContainer />
    </section>
  );
}

export default PostList;
