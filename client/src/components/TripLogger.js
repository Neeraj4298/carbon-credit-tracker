import React, { useState } from 'react';
import axios from 'axios';

const TripLogger = () => {
  const [form, setForm] = useState({
    method: 'public',
    miles: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.user.id;

    try {
    //   const res = await axios.post('http://localhost:5000/api/trips', {
    //     ...form,
    //     userId,
    //   });
    const res = await axios.post(
        'http://localhost:5000/api/trips',
        {
          method: form.method,
          miles: form.miles,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      alert(`Trip logged! Earned ${res.data.trip.pointsEarned} points`);
    } catch (err) {
      console.error(err);
      alert('Failed to log trip');
    }
  };

  return (
    <div>
      <h3>Log Trip</h3>
      <form onSubmit={handleSubmit}>
        <select name="method" value={form.method} onChange={handleChange}>
          <option value="public">Public Transport</option>
          <option value="carpool">Carpooling</option>
          <option value="rideshare">Rideshare</option>
          <option value="wfh">Work From Home</option>
        </select>
        {form.method !== 'wfh' && (
          <input type="number" name="miles" value={form.miles} onChange={handleChange} placeholder="Miles" />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TripLogger;
