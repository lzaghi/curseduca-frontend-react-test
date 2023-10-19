import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { TPost } from '../types/types';
import trash from '../assets/trash.svg';
import styles from './styles/delete.module.css';

const customStyles = {
  content: {
    backgroundColor: '#f5f5f5',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100vw - 20px)',
    maxWidth: '500px',
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
      <button type="button" onClick={openModal} className={styles.deleteButton}>
        <Image src={trash} alt="delete icon" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2>Sua publicação será deletada!</h2>
        <p className={styles.warning}>
          Tem certeza de que deseja excluir
          {' '}
          <em>permanentemente</em>
          {' '}
          o post
          <b>{` "${post.title}"`}</b>
          ?
        </p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} type="button" onClick={closeModal}>Cancelar</button>
          <button className={styles.confirmButton} type="button" onClick={() => deletePost(post.id)}>Deletar</button>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
