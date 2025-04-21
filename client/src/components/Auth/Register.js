import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    organization: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = process.env.REACT_APP_API_URL || 'https://your-render-backend-url.onrender.com/api';
      console.log('Attempting registration with URL:', baseURL);
      console.log('Form data:', form);
      
      const response = await axios.post(`${baseURL}/auth/register`, form);
      console.log('Registration response:', response.data);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      const errorMessage = err.response?.data?.msg 
        || err.response?.data?.error 
        || err.message 
        || 'Registration failed. Please try again.';
      
      alert(errorMessage);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          value={form.name} 
          placeholder="Name" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="email" 
          value={form.email} 
          placeholder="Email" 
          type="email" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          value={form.password} 
          placeholder="Password" 
          type="password" 
          onChange={handleChange} 
          required 
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        <input 
          name="organization" 
          value={form.organization} 
          placeholder="Organization (if any)" 
          onChange={handleChange} 
        />
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Already registered? Login
      </p>
    </div>
  );
};

export default Register;
