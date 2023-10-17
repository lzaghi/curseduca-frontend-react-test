'use client'
import { useAppSelector } from '@/redux/store';
import request from '@/services/request';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setPostsAction } from '@/redux/slices/postSlice';

function Posts() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    author: '',
    category: '',
  })

  const { token } = useAppSelector((state) => state.authReducer.value);
  const { posts } = useAppSelector((state) => state.postsReducer.value);
  const { categories } = useAppSelector((state) => state.postsReducer.value);
  console.log(categories)
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const headers = { headers: { authorization: `Bearer ${token}` } }
        const posts = await request.getPosts(headers);
        const users = await request.getUsers(headers);
        dispatch(setPostsAction(posts.data.reverse()));
        setUsers(Object.values(users.data));
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [token, dispatch])

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