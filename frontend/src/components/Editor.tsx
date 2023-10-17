'use client'
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import request from '@/services/request';
import { useAppSelector } from '@/redux/store';
import { AppDispatch } from '@/redux/store';
import { setPostsAction } from '@/redux/slices/feedSlice';
import { useDispatch } from 'react-redux';
import { dateFormatter } from '@/helpers/dateHandler';

function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('1')

  const { token, email } = useAppSelector(state => state.authReducer.value);
  const { categories, users } = useAppSelector((state) => state.postsReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const publishPost = async () => {
    const headers = { 
      headers: { authorization: `Bearer ${token}` }
    }
    const body = {
      title,
      text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      id_user: users.find((user) => user.email === email)?.id,
      id_category: +category,
      date: dateFormatter(new Date()),
    }
    try {
      await request.createPost(body, headers);
      setEditorState(EditorState.createEmpty());
      setTitle('');
      const posts = await request.getPosts(headers);
      dispatch(setPostsAction(posts.data.reverse()));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <input
        type="text"
        value={ title }
        onChange={ e => setTitle(e.target.value) }
        placeholder="Title"
      />
      <label htmlFor='category'>Category</label>
      <select
        name='category'
        onChange={ e => setCategory(e.target.value)}
      >
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
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
      />
      <button>
        Schedule post
      </button>
      <button
        type='button'
        onClick={ publishPost }
      >
        Publish
      </button>
    </section>
  )
}

export default EditorComponent;