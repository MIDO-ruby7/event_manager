import React, { useState, useRef, useEffect } from 'react'
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { formatDate, isEmptyObject, validateEvent } from '../helpers/helpers';
import PropTypes from 'prop-types'

const EventForm = ({ onSave }) => {
  const [event, setEvent] = useState({
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const dateInput = useRef(null);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateEvent({ name, value });
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className='errors'>
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('event_date', formattedDate);
      },
    });

    return () => p.destroy();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(event);
    }
  };

  return (
    <section>
      {renderErrors()}

      <h2>New Event</h2>
      <form className='eventForm' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='event_type'>
            <strong>Type</strong>
            <input type='text' name='event_type' id='event_type' onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor='event_date'>
            <strong>Date:</strong>
            <input type='text' name='event_date' id='event_date' ref={dateInput} autoComplete='off' />
          </label>
        </div>
        <div>
          <label htmlFor='title'>
            <strong>Title:</strong>
            <textarea name='title' id='title' cols='30' rows='10' onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor='speaker'>
            <strong>Speakers:</strong>
            <input type='text' name='speaker' id='speaker' onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor='host'>
            <strong>Host:</strong>
            <input type='text' name='host' id='host' onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor='published'>
            <strong>Published:</strong>
            <input type='checkbox' name='published' id='published' onChange={handleInputChange} />
          </label>
        </div>
        <div className='form-acions'>
          <button type='submit'>Save</button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;

EventForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};