import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load both personal and group expenses
    const loadTransactions = () => {
      const personalExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      const groupExpenses = JSON.parse(localStorage.getItem('groupExpenses') || '[]');
      
      // Combine and sort by date
      const allTransactions = [...personalExpenses, ...groupExpenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Show only recent 5 transactions
      
      setTransactions(allTransactions);
    };

    loadTransactions();
    
    // Update when new transactions are added
    window.addEventListener('expensesUpdated', loadTransactions);
    return () => window.removeEventListener('expensesUpdated', loadTransactions);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <nav className="dashboard-nav">
          <button onClick={() => navigate('/group-expense')}>Add Group Expense</button>
          <button onClick={() => navigate('/add-expense')}>Add Single Expense</button>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="transactions-section">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div key={index} className="transaction-card">
                  <div className="transaction-header">
                    <h3>{transaction.title || transaction.purpose}</h3>
                    <span className="amount">
                      {transaction.currency || '₹'}{parseFloat(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <p>Date: {transaction.date}</p>
                    <p>Paid by: {transaction.paidBy || 'You'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-transactions">
                <p>No transactions yet</p>
                <p>Start by adding a personal or group expense</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;