import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import EventList from './EventList';
import Event from './Event';
import EventFrom from './EventForm';

const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/events');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch('/api/v1/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      window.alert('Event Added.');
      navigate(`/events/${savedEvent.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
        <div className="gird">
          {isError && <p>Something went wrong. Check the console.</p>}
          {isLoading ? (
            <p className='loarding'>Loading...</p>
          ) : (
            <>
              <EventList events={events} />

              <Routes>
                <Route path="new" element={<EventFrom onSave={addEvent} />} />
                <Route path=":id" element={<Event events={events} />} />
              </Routes>
            </>
          )}
        </div>
    </>
  );
};

export default Editor;