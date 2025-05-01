import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddExpense.css";

const AddExpense = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("₹");
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    date: "",
    time: "",
    description: "",
    paidBy: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseData.amount || !expenseData.title) {
      alert("Please fill in amount and title");
      return;
    }
    setShowSuccessModal(true);
  };

  const handleGotIt = () => {
    setShowSuccessModal(false);
    setTransactions((prev) => [
      ...prev,
      {
        purpose: expenseData.title,
        amount: expenseData.amount,
        currency: currency,
        date: expenseData.date,
        time: expenseData.time,
        description: expenseData.description,
        paidBy: expenseData.paidBy,
      },
    ]);
    setExpenseData({
      title: "",
      amount: "",
      date: "",
      time: "",
      description: "",
      paidBy: "",
    });
  };

  const handleDelete = (index) => {
    setExpenseToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (expenseToDelete !== null) {
      setTransactions(prev => prev.filter((_, index) => index !== expenseToDelete));
      setShowDeleteConfirm(false);
      setExpenseToDelete(null);
    }
  };

  const ExpenseDetailsModal = ({ expense, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="group-header">
            <div className="group-title">
              <h2>{expense.purpose}</h2>
            </div>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="group-info">
            <p>
              <strong>Amount:</strong> {expense.currency}
              {Number.parseFloat(expense.amount).toFixed(2)}
            </p>
            <p>
              <strong>Paid by:</strong> {expense.paidBy || "You"}
            </p>
            <p>
              <strong>Date:</strong> {expense.date || "N/A"} {expense.time ? `| ${expense.time}` : ""}
            </p>
            <p>
              <strong>Description:</strong> {expense.description || "No description"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {showSuccessModal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Expense added successfully!</h2>
            <p>Your expense has been recorded.</p>
            <button className="got-it-button" onClick={handleGotIt}>
              Got it
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <button className="back-button" onClick={() => navigate("/")}>
              ←
            </button>
            <h1 className="header-title">Create New Bill</h1>
            <div className="profile-section"></div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-main-section">
              <div className="form-group title-group">
                <label className="label">Title</label>
                <input
                  className="input"
                  type="text"
                  value={expenseData.title}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, title: e.target.value })
                  }
                  placeholder="Enter expense title"
                />
              </div>

              <div className="form-group amount-group">
                <label className="label">Enter Amount</label>
                <div className="expense-input-container">
                  <select
                    className="currency-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="₹">₹ (INR)</option>
                    <option value="£">£ (GBP)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="¥">¥ (JPY)</option>
                    <option value="A$">A$ (AUD)</option>
                    <option value="C$">C$ (CAD)</option>
                    <option value="CHF">CHF (Swiss Franc)</option>
                    <option value="CNY">CNY (Chinese Yuan)</option>
                  </select>
                  <input
                    className="input amount-input"
                    type="text"
                    value={expenseData.amount}
                    onChange={(e) =>
                      setExpenseData({ ...expenseData, amount: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Date and Time Section */}
              <div className="datetime-section">
                <div className="form-group">
                  <label className="label">Date</label>
                  <input
                    className="input"
                    type="date"
                    value={expenseData.date}
                    onChange={(e) =>
                      setExpenseData({ ...expenseData, date: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="label">Time</label>
                  <input
                    className="input"
                    type="time"
                    value={expenseData.time}
                    onChange={(e) =>
                      setExpenseData({ ...expenseData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="form-group description-group">
                <label className="label">Description</label>
                <textarea
                  className="input description-input"
                  value={expenseData.description}
                  onChange={(e) =>
                    setExpenseData({
                      ...expenseData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Add a description"
                  rows="3"
                />
              </div>
            </div>

            <button className="submit-button" type="submit">
              ADD EXPENSE
            </button>
          </form>

          {/* Remove Recent Transactions section and keep only All Transactions */}
          <div className="transactions-section">
            <div className="transactions-header">
              <h2>All Transactions</h2>
              <button className="view-all-button">View All</button>
            </div>
            <div className="transactions-list">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="transaction-item"
                >
                  <div 
                    className="transaction-content"
                    onClick={() => {
                      setSelectedExpense(transaction);
                      setShowExpenseDetails(true);
                    }}
                  >
                    <div className="transaction-icon-container">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/128/6553/6553062.png"
                        alt="Transaction"
                        className="transaction-icon"
                      />
                    </div>
                    <div className="transaction-details">
                      <h3>{transaction.purpose}</h3>
                      <p>
                        {transaction.date || "N/A"} {transaction.time ? `| ${transaction.time}` : ""}
                      </p>
                      <p>
                        <strong>Paid by:</strong> {transaction.paidBy || "You"}
                      </p>
                    </div>
                    <div className="transaction-amount">
                      {transaction.currency}
                      {Number.parseFloat(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                  <button 
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {transactions.length === 0 && (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No transactions available
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {showExpenseDetails && selectedExpense && (
        <ExpenseDetailsModal
          expense={selectedExpense}
          onClose={() => setShowExpenseDetails(false)}
        />
      )}

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content delete-confirm">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this expense?</p>
            <div className="modal-buttons">
              <button 
                className="cancel-button" 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setExpenseToDelete(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-button"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpense;