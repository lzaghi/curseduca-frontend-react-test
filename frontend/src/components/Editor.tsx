import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import request from '@/services/request';
import { useAppSelector } from '@/redux/store';

function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { token } = useAppSelector(state => state.authReducer.value);

  const publishPost = async () => {
    
    const headers = { 
      headers: { authorization: `Bearer ${token}` }
    }
    const body = {
      title: 'teste',
      text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      id_user: 1,
      id_category: 1,
    }
    try {
      await request.createPost(body, headers);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
      <button>
        Schedule
      </button>
      <button
        type='button'
        onClick={ publishPost }
      >
        Post
      </button>
    </section>
  )
}

export default EditorComponent;