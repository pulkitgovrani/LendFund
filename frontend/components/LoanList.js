import React, { useState, useEffect } from 'react';

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('/api/loans');
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div>
      <h2>Active Loans</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>Amount: {loan.amount}, Approved: {loan.approved ? 'Yes' : 'No'}, Repaid: {loan.repaid ? 'Yes' : 'No'}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
