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
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} required />
        <input name="email" value={form.email} placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" value={form.password} placeholder="Password" type="password" onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        <input name="organization" value={form.organization} placeholder="Organization (if any)" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Already registered? Login</p>
    </div>
  );
};

export default Register;
