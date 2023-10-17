import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { dateFormatter } from '@/helpers/dateHandler';

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

function SchedulerModal({ resetEditor, disabled }: any) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const [scheduled, setScheduled] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setScheduled('');
  };

  const scheduleDateTime = (datetime: Value) => {
    console.log(`post is scheduled: ${datetime}`);
    setScheduled(dateFormatter(datetime as Date));
    resetEditor();
  }

  return (
    <div>
      <button onClick={openModal} disabled={ disabled }>Schedule post</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={ customStyles }
      >
        <h2>Schedule your post!</h2>
        <p>When do you want your post to be published?</p>
        <DateTimePicker
          onChange={onChange}
          value={value}
          minDate={new Date()}
          clearIcon={null}
          disableClock={true}
        />
        <button onClick={() => scheduleDateTime(value)}>
          Schedule
        </button>
        <button onClick={closeModal}>Close</button>
        {
          scheduled && (
            <p>post is scheduled: {scheduled}</p>
          )
        }
      </Modal>
    </div>
  );
}

export default SchedulerModal;
