'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { AppDispatch, useAppSelector } from '../redux/store';
import request from '../services/request';
import Post from './Post';
import 'react-toastify/dist/ReactToastify.css';
import { TPost, TCategory, TUser } from '../types/types';
import { setPostsAction } from '../redux/slices/feedSlice';
import styles from './styles/PostList.module.css';

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
      const { data } = await request.getPosts(headers);
      dispatch(setPostsAction(data.reverse()));
      toast.success('Post deletado', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      if (error?.response?.data?.status === 401) {
        push('/login');
      }
      toast.error(error?.response?.data?.message || 'Internal error');
    }
  };

  return (
    <section>
      <div className={styles.filtersContainer}>
        <div className={styles.filtersWrapper}>
          <h3 className={styles.header}>Filtros de busca</h3>
          <div className={styles.filters}>
            <label htmlFor="category" className={styles.filter}>
              Categoria: &nbsp;
              <select
                name="category"
                onChange={handleFilterChange}
                className={styles.select}
              >
                <option value="">Todas</option>
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
            <label htmlFor="author" className={styles.filter}>
              Autor: &nbsp;
              <select
                name="author"
                onChange={handleFilterChange}
                className={styles.select}
              >
                <option value="">Todos</option>
                {
                users
                  .map((user: TUser) => (
                    <option
                      key={user.email}
                      value={user.id}
                    >
                      Dev
                      {` ${user.id}`}
                    </option>
                  ))
              }
              </select>
            </label>
          </div>
        </div>
      </div>
      {
        !filterPosts(posts).length ? (
          <p className={styles.noPosts}>Nenhuma publicação encontrada...</p>
        ) : (
          filterPosts(posts).map((post: TPost) => (
            <Post key={post.id} post={post} deletePost={deletePost} />
          ))
        )
      }
      <ToastContainer />
    </section>
  );
}

export default PostList;
