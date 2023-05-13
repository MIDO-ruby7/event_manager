import React, { useState } from 'react'
import { isEmptyObject, validateEvent } from '../helpers/helpers';

const EventForm = () => {
  const [event, setEvent] = useState({
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setEvent({ ...event, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      console.log(event);
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
            <input type='text' name='event_date' id='event_date' onChange={handleInputChange} />
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