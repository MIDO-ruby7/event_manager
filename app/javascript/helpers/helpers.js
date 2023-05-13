export const isEmptyObject = obj => Object.keys(obj).length === 0

export const validateEvent = (event) => {
  const errors = {};

  if (event.event_type === ''){
    errors.event_type = 'You must enter an event type';
  }

  if (event.event_date === ''){
    errors.event_date = 'You must enter an event date';
  }

  if (event.title === ''){
    errors.title = 'You must enter a title';
  }

  if (event.speaker === ''){
    errors.speaker = 'You must enter a speaker';
  }

  if (event.host === ''){
    errors.host = 'You must enter a host';
  }

  return errors;
}
