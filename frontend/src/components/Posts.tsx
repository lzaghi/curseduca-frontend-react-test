'use client'
import { useAppSelector } from '@/redux/store';
import request from '@/services/request';
import React, { useEffect, useState } from 'react'

function Posts() {
  const { token } = useAppSelector((state) => state.authReducer.value);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const headers = { headers: { authorization: `Bearer ${token}` } }
        const { data } = await request.getPosts(headers);
        console.log(data)
        setPosts(data);
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [token])

  return (
    <section>
      <h1>Posts</h1>
      {
        loading ? <p>Loading...</p> :
        (
          posts.map((post: {id: number, title: string, text: string}) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p dangerouslySetInnerHTML={ { __html: post.text } }/>
            </article>
          ))
        )  
      }
      { error && <p>{error}</p> }
    </section>
  )
}

export default Posts