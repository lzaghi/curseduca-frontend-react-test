import React, { useState } from 'react';
import Modal from 'react-modal';

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

function DeleteModal({ postId, deletePost }: { postId: number, deletePost: (id: number) => void }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>Delete post</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2>Your post will be deleted</h2>
        <p>Are you sure you want to continue?</p>
        <button type="button" onClick={closeModal}>Cancel</button>
        <button type="button" onClick={() => deletePost(postId)}>Delete</button>
      </Modal>
    </div>
  );
}

export default DeleteModal;
