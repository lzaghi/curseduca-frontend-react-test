import React, { useState } from 'react';
import Modal from 'react-modal';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '500px'
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
      <button onClick={openModal}>Delete post</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={ customStyles }
      >
        <h2>Your post will be deleted</h2>
        <p>Are you sure you want to continue?</p>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={ () => deletePost(postId) }>Delete</button>
      </Modal>
    </div>
  );
}

export default DeleteModal;
