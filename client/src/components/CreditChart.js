import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const CreditChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.user.id;

      try {
        const res = await axios.get(`http://localhost:5000/api/trips/user/${userId}`, {
          headers: { Authorization: token }
        });

        const chartData = res.data.map((trip, i) => ({
          name: `${trip.method} ${i + 1}`,
          points: trip.pointsEarned
        }));

        setData(chartData);
      } catch (err) {
        console.error('Failed to fetch trip data', err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <h3>Carbon Credits Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="points" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreditChart;
