'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { customDate } from '../helpers/dateHandler';
import DeleteModal from '../modals/delete';
import { useAppSelector } from '../redux/store';
import { TPost } from '../types/types';
import styles from './styles/Post.module.css';
import face from '../assets/face.svg';
import heart from '../assets/heart.svg';
import comment from '../assets/comment.svg';

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
    <article key={post.id} className={styles.postCard}>
      <div className={styles.profile}>
        <div className={styles.profilePic}>
          <Image src={face} alt="face icon" />
        </div>
        <h3 className={styles.user}>
          Dev
          {' '}
          {` ${post.id_user}`}
        </h3>
      </div>
      <h2>{post.title}</h2>
      <div className={styles.categoryDate}>
        <p className={styles.category}>
          {categories.find((category: {id: number}) => category.id === post.id_category)?.name}
        </p>
        <p className={styles.date}>{customDate(post.date)}</p>
      </div>
      <div ref={textRef} className={styles.postText} />
      <div className={styles.icons}>
        <div className={styles.fakeIcons}>
          <Image src={heart} alt="heart icon" />
          <Image src={comment} alt="comment icon" className={styles.commentIcon} />
        </div>
        {
          users.find((user) => user.email === email)?.id === post.id_user && (
            <DeleteModal post={post} deletePost={deletePost} />
          )
        }
      </div>
    </article>
  );
}

export default Post;
