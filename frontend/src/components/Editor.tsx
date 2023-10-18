'use client';

import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import request from '../services/request';
import { useAppSelector, AppDispatch } from '../redux/store';
import { dateFormatter } from '../helpers/dateHandler';
import SchedulerModal from '../modals/scheduler';
import 'react-toastify/dist/ReactToastify.css';
import { TCategory } from '../types/types';
import { setPostsAction } from '../redux/slices/feedSlice';

function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('1');
  const [disabled, setDisabled] = useState(false);

  const { token, email } = useAppSelector((state) => state.authReducer.value);
  const { categories, users } = useAppSelector((state) => state.postsReducer.value);

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  const resetEditor = () => {
    setEditorState(EditorState.createEmpty());
    setTitle('');
  };

  const publishPost = async () => {
    const headers = {
      headers: { authorization: `Bearer ${token}` },
    };
    const body = {
      title,
      text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      id_user: users.find((user) => user.email === email)?.id,
      id_category: +category,
      date: dateFormatter(new Date()),
    };
    try {
      await request.createPost(body, headers);
      resetEditor();
      const { data } = await request.getPosts(headers);
      dispatch(setPostsAction(data.reverse()));
      toast.success('Publicado com sucesso!');
    } catch (error: any) {
      if (error?.response?.data?.status === 401) {
        push('/login');
      }
      toast.error(error?.response?.data?.message || 'Internal error');
    }
  };

  useEffect(() => {
    setDisabled(!title || !editorState.getCurrentContent().hasText());
  }, [title, editorState]);

  return (
    <section>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <label htmlFor="category">
        Categoria
        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
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
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
      />
      <SchedulerModal resetEditor={resetEditor} disabled={disabled} />
      <button
        type="button"
        onClick={publishPost}
        disabled={disabled}
      >
        Publicar
      </button>
      <ToastContainer />
    </section>
  );
}

export default EditorComponent;
