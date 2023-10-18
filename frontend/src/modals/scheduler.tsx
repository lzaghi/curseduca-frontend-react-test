import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { dateFormatter } from '../helpers/dateHandler';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { TValue } from '../types/types';

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

function SchedulerModal({ resetEditor, disabled }: { resetEditor: () => void, disabled: boolean }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dateTimeValue, onChange] = useState<TValue>(new Date());
  const [scheduled, setScheduled] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setScheduled('');
  };

  const scheduleDateTime = (datetime: TValue) => {
    setScheduled(dateFormatter(datetime as Date));
    resetEditor();
  };

  return (
    <div>
      <button type="button" onClick={openModal} disabled={disabled}>Schedule post</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2>Schedule your post!</h2>
        <p>When do you want your post to be published?</p>
        <DateTimePicker
          onChange={onChange}
          value={dateTimeValue}
          minDate={new Date()}
          clearIcon={null}
          disableClock
        />
        <button type="button" onClick={() => scheduleDateTime(dateTimeValue)}>
          Schedule
        </button>
        <button type="button" onClick={closeModal}>Close</button>
        {
          scheduled && (
            <p>
              post is scheduled:
              {' '}
              {scheduled}
            </p>
          )
        }
      </Modal>
    </div>
  );
}

export default SchedulerModal;
