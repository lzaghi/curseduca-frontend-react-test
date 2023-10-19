'use client';

import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import request from '../services/request';
import { useAppSelector, AppDispatch } from '../redux/store';
import { dateFormatter } from '../helpers/dateHandler';
import SchedulerModal from '../modals/scheduler';
import 'react-toastify/dist/ReactToastify.css';
import { TCategory } from '../types/types';
import { setPostsAction } from '../redux/slices/feedSlice';
import styles from './styles/Editor.module.css';
import logo from '../assets/logo.png';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

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
      toast.success('Publicado com sucesso!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
    <section className={styles.editorContainer}>
      <div className={styles.editorWrapper}>
        <Image src={logo} alt="logo Curseduca Social Media" className={styles.logo} />
        <h1 className={styles.header}>Faça uma publicação!</h1>
        <div className={styles.postInfo}>
          <label htmlFor="category">
            Escolha uma categoria: &nbsp;
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              className={styles.categorySelect}
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className={styles.titleInput}
          />
        </div>
        <Editor
          editorState={editorState}
          wrapperClassName={styles.draftWrapper}
          editorClassName={styles.draftEditor}
          toolbarClassName={styles.draftToolbar}
          onEditorStateChange={(editorState) => setEditorState(editorState)}
        />
        <div className={styles.publishOptions}>
          <SchedulerModal resetEditor={resetEditor} disabled={disabled} />
          <button
            className={styles.publishButton}
            type="button"
            onClick={publishPost}
            disabled={disabled}
          >
            Publicar
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default EditorComponent;
