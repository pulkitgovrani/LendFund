import React, { useState } from 'react';

const LoanForm = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/loans/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const result = await response.json();
      console.log('Loan created:', result);
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button type="submit">Create Loan</button>
    </form>
  );
};

export default LoanForm;
