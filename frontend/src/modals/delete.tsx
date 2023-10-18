import React, { useState } from 'react';
import Modal from 'react-modal';
import { TPost } from '../types/types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '500px',
  },
};

function DeleteModal({ post, deletePost }: { post: TPost, deletePost: (id: number) => void }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>*lixeirinha*</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2>Sua publicação será deletada!</h2>
        <p>
          Tem certeza de que deseja excluir o post
          {` "${post.title}"`}
          ?
        </p>
        <button type="button" onClick={closeModal}>Cancel</button>
        <button type="button" onClick={() => deletePost(post.id)}>Deletar</button>
      </Modal>
    </div>
  );
}

export default DeleteModal;
