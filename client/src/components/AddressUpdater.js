import React, { useState } from 'react';
import axios from 'axios';

const AddressUpdater = () => {
  const [form, setForm] = useState({
    homeAddress: '',
    workAddress: '',
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
      await axios.put(`http://localhost:5000/api/auth/address/${userId}`, form, {
        headers: { Authorization: token }
      });
      alert('Addresses updated!');
    } catch (err) {
      alert('Failed to update address');
    }
  };

  return (
    <div>
      <h3>Update Home/Work Address</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="homeAddress"
          placeholder="Home Address"
          value={form.homeAddress}
          onChange={handleChange}
        />
        <input
          name="workAddress"
          placeholder="Work Address"
          value={form.workAddress}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddressUpdater;
