import React from 'react';
import TripLogger from '../components/TripLogger';
import CreditChart from '../components/CreditChart';
import AddressUpdater from '../components/AddressUpdater';

const Dashboard = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="card">
      <h2>Dashboard</h2>
      {token ? (
        <>
          <p>Welcome! Your token is saved.</p>
          <TripLogger />
          <CreditChart />
          <AddressUpdater />
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
