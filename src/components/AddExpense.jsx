import React, { useState } from 'react';
import './AddExpense.css';

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    purpose: '',
    title: '',
    date: '',
    time: '',
    amount: '',
    description: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense Data:', expenseData);
    setShowSuccessModal(true);
  };

  const handleGotIt = () => {
    setShowSuccessModal(false);
    setExpenseData({
      title: '',
      date: '',
      time: '',
      amount: '',
      description: ''
    });
  };

  return (
    <div className="container">
      {showSuccessModal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <span className="sparkle-1">✦</span>
            <span className="sparkle-2">✦</span>
            <span className="sparkle-3">✦</span>
            <span className="sparkle-4">✦</span>
            <h2>Bill added!</h2>
            <p>Your friends have been notified and payments are processing.</p>
            <button className="got-it-button" onClick={handleGotIt}>Got it</button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <button className="back-button">←</button>
            <h1 className="header-title">Create New Bill</h1>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Title</label>
              <input
                className="input"
                type="text"
                value={expenseData.title}
                onChange={(e) => setExpenseData({...expenseData, title: e.target.value})}
                placeholder="Enter expense title"
              />
            </div>

            <div className="date-time-container">
              <div className="form-group" style={{ flex: 1, marginRight: '10px' }}>
                <label className="label">Date</label>
                <input
                  className="input"
                  type="date"
                  value={expenseData.date}
                  onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                />
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="label">Time</label>
                <input
                  className="input"
                  type="time"
                  value={expenseData.time}
                  onChange={(e) => setExpenseData({...expenseData, time: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Enter Amount</label>
              <input
                className="input"
                type="number"
                value={expenseData.amount}
                onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                placeholder="£0.00"
              />
            </div>

            <div className="form-group">
              <label className="label">Description</label>
              <input
                className="input"
                type="text"
                value={expenseData.description}
                onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                placeholder="Add a description"
              />
            </div>
            
            <button className="submit-button" type="submit">ADD</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddExpense;