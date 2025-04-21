import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Change this hardcoded URL to use environment variable
      const baseURL = process.env.REACT_APP_API_URL || 'https://carbon-credit-tracker-backend.onrender.com/api';
      const res = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = JSON.parse(atob(token.split('.')[1]));

      if (decoded.user.role === 'employer') {
        navigate('/employer-dashboard');
      } else if (decoded.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>New user? Register</p>
    </div>
  );
};

export default Login;
