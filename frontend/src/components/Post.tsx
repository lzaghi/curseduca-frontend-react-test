'use client';

import React, { useEffect, useRef } from 'react';
import { customDate } from '../helpers/dateHandler';
import DeleteModal from '../modals/delete';
import { useAppSelector } from '../redux/store';
import { TPost } from '../types/types';

function Post({ post, deletePost }: { post: TPost, deletePost: (id: number) => void }) {
  const { email } = useAppSelector((state) => state.authReducer.value);
  const { categories, users } = useAppSelector((state) => state.postsReducer.value);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = post.text;
    }
  }, [textRef, post]);

  return (
    <article key={post.id}>
      <h2>{post.title}</h2>
      <p>
        Dev
        {' '}
        {` ${post.id_user}`}
      </p>
      <p>{categories.find((category: {id: number}) => category.id === post.id_category)?.name}</p>
      <div ref={textRef} />
      <p>{customDate(post.date)}</p>
      {
          users.find((user) => user.email === email)?.id === post.id_user && (
            <DeleteModal post={post} deletePost={deletePost} />
          )
        }
    </article>
  );
}

export default Post;
