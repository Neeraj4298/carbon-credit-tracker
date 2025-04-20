import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/pending-employers', {
        headers: { Authorization: token }
      });
      setPending(res.data);
    };
    fetchPending();
  }, []);

  const approveEmployer = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/admin/approve-employer/${id}`, {}, {
      headers: { Authorization: token }
    });
    alert('Employer approved!');
    setPending(pending.filter(emp => emp._id !== id));
  };

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <h3>Pending Employer Approvals</h3>
      <ul>
        {pending.map(emp => (
          <li key={emp._id}>
            {emp.name} ({emp.email}) — {emp.organization}
            <button onClick={() => approveEmployer(emp._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
