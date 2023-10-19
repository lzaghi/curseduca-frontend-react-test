import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Image from 'next/image';
import { dateFormatter } from '../helpers/dateHandler';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { TValue } from '../types/types';
import watch from '../assets/watch.svg';
import styles from './styles/scheduler.module.css';

const customStyles = {
  content: {
    backgroundColor: '#f5f5f5',
    top: '-220px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 50%)',
    height: '500px',
    width: 'calc(100vw - 20px)',
    maxWidth: '500px',
  },
};

function SchedulerModal({
  resetEditor,
  disabled,
}: { resetEditor: () => void, disabled: boolean }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dateTimeValue, onChange] = useState<TValue>(new Date());
  const [scheduled, setScheduled] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    resetEditor();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setScheduled('');
  };

  const scheduleDateTime = (datetime: TValue) => {
    setScheduled(dateFormatter(datetime as Date));
  };

  return (
    <div>
      <button type="button" onClick={openModal} disabled={disabled} className={styles.scheduleButton}>
        <Image src={watch} alt="watch icon" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className={styles.header}>
          <h2>Agende sua publicação!</h2>
          <button className={styles.cancelButton} type="button" onClick={closeModal}>X</button>
        </div>
        <p className={styles.question}>Quando você quer que seu post seja publicado?</p>
        <DateTimePicker
          onChange={onChange}
          value={dateTimeValue}
          minDate={new Date()}
          clearIcon={null}
          disableClock
        />
        <button className={styles.confirmButton} type="button" onClick={() => scheduleDateTime(dateTimeValue)}>
          Agendar
        </button>
        {
          scheduled && (
            <p className={styles.confirmation}>
              Publicação agendada para:
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
