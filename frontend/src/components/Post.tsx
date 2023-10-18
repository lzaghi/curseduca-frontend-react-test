import { customDate } from '@/helpers/dateHandler';
import DeleteModal from '@/modals/delete';
import { useAppSelector } from '@/redux/store';
import React from 'react'

function Post({ post, deletePost }: { post: Post, deletePost: (id: number) => void }) {
  const { email } = useAppSelector(state => state.authReducer.value);
  const { categories, users } = useAppSelector((state) => state.postsReducer.value);

  return (
    <article key={post.id}>
        <h2>{post.title}</h2>
        <p>Dev {post.id_user}</p>
        <p>{categories.find((category: {id: number}) => category.id === post.id_category)?.name}</p>
        <p dangerouslySetInnerHTML={ { __html: post.text } } />
        <p>{customDate(post.date)}</p>
        {
          users.find((user) => user.email === email)?.id === post.id_user && (
            <DeleteModal postId={post.id} deletePost={deletePost} />
          )
        }
      </article>
  )
}

export default Post