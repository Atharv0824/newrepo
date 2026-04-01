import React from 'react';
import { useUserTracking } from '../hooks/useUserTracking';

const TrackingExample = () => {
  const { trackButtonClick, trackFormSubmit, trackAction } = useUserTracking();

  const handleBookSession = () => {
    // Track the button click
    trackButtonClick('book_session', {
      counsellorId: '123',
      sessionType: 'individual',
    });
    
    // Your existing logic here
    console.log('Booking session...');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Track form submission
    trackFormSubmit('appointment_booking', {
      date: data.date,
      time: data.time,
      // Don't send sensitive data
    });
    
    // Your existing logic here
    console.log('Submitting appointment...');
  };

  return (
    <div>
      <button onClick={handleBookSession}>
        Book Session
      </button>
      
      <form onSubmit={handleFormSubmit}>
        <input type="date" name="date" />
        <input type="time" name="time" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TrackingExample;
