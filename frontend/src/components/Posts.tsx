'use client'
import { customDate } from '@/helpers/dateHandler';
import { setPostsAction } from '@/redux/slices/feedSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import request from '@/services/request';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function Posts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    author: '',
    category: '',
  })

  const { token, email } = useAppSelector(state => state.authReducer.value);
  const { posts, categories, users } = useAppSelector((state) => state.postsReducer.value);

  const dispatch = useDispatch<AppDispatch>();

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h1>Posts</h1>
      {
        loading
        ? <p>Loading...</p>
        : (
          <>
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
                  <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>Dev {post.id_user}</p>
                    <p>{categories.find((category: {id: number}) => category.id === post.id_category)?.name}</p>
                    <p dangerouslySetInnerHTML={ { __html: post.text } } />
                    <p>{customDate(post.date)}</p>
                    {
                      users.find((user) => user.email === email)?.id === post.id_user && (
                        <button
                          type='button'
                          onClick={ () => deletePost(post.id)}
                        >
                          Delete post
                        </button>
                      )
                    }
                  </article>
                ))
              }
            </section>
          </>
        )  
      }
      { error && <p>{error}</p> }
    </section>
  )
}

export default Posts