import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreditTransfer from '../components/CreditTransfer';


const EmployerDashboard = () => {
  const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const payload = JSON.parse(atob(token.split('.')[1]));
    

//     if (payload.user.role !== 'employer') {
//       alert('Access denied: Not an employer');
//       return;
//     }

//     const fetchEmployees = async () => {
//       const res = await axios.get(`http://localhost:5000/api/employer/${payload.user.organization}`);
//       setEmployees(res.data);
//     };

//     fetchEmployees();
//   }, []);

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Logged in user:', payload.user);
  
    if (payload.user.role !== 'employer') {
      alert('Access denied: Not an employer');
      return;
    }
  
    const fetchEmployees = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/api/employer/${payload.user.organization}`);
        const res = await axios.get(
            `http://localhost:5000/api/employer/${payload.user.organization}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
  
    fetchEmployees();
  }, []);
  


  return (
    <div className="card">
      <h2>Employer Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.carbonCredits}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreditTransfer />

    </div>
  );
};

export default EmployerDashboard;
