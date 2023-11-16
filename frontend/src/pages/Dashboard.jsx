import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';
import Button from '../components/Button/Button';
import axios from 'axios';
import '../components/Dashboard/dashboard.css'; 

function Dashboard({ user }) {
  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(`https://nexuspod-backend.onrender.com/events/${user._id}`);
      setAllEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEventClick = () => {
    navigate('/events/new');
  };

  const handleEventClick = (id) => {
    navigate('/events/event/' + id);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.startDateTime);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  const upcomingEvents = allEvents
    .filter((event) => {
      const eventDate = new Date(event.startDateTime);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() > today.getTime();
    })
    .slice(0, 3);

  return (
    <div className='dashboard'>
      <h1>Welcome, {user.username}</h1>

      <div className='events-container'>
        {/* Events for Today */}
        <div className='events-table'>
          <h2>Events for Today</h2>
          {todayEvents.length === 0 ? (
            <p>No events for today</p>
          ) : (
            <table>
              <tbody>
                {todayEvents.map((event) => (
                  <tr key={event._id} onClick={() => handleEventClick(event._id)}>
                    <td>{event.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Upcoming Events */}
        <div className='events-table'>
          <h2>Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <p>No upcoming events</p>
          ) : (
            <table>
              <tbody>
                {upcomingEvents.map((event) => (
                  <tr key={event._id} onClick={() => handleEventClick(event._id)}>
                    <td>{event.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {upcomingEvents.length > 0 && <div><p>...</p></div>}
        </div>

        {/* Button */}
        <div className='button-container'>
          <Button onClick={handleAddEventClick}>Add New Event</Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
