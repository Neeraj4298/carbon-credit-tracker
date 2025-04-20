import React, { useState } from 'react';
import axios from 'axios';

const CreditTransfer = () => {
  const [toOrg, setToOrg] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));

    try {
      const res = await axios.post('http://localhost:5000/api/employer/transfer', {
        fromOrg: payload.user.organization,
        toOrg,
        amount: parseInt(amount)
      }, {
        headers: { Authorization: token }
      });

      alert(res.data.msg);
    } catch (err) {
      alert('Transfer failed');
    }
  };

  return (
    <div>
      <h3>Transfer Credits</h3>
      <form onSubmit={handleSubmit}>
        <input value={toOrg} onChange={(e) => setToOrg(e.target.value)} placeholder="Recipient Org" required />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default CreditTransfer;
