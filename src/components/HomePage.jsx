import React, { useState } from 'react';
import AddExpense from './AddExpense';
import GroupExpense from './GroupExpense';
import './HomePage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('addExpense');

  return (
    <div className="home-container">
      <div className="app-header">
        <h1 className="app-title">SPLITWISE</h1>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'addExpense' ? 'active' : ''}`}
            onClick={() => setActiveTab('addExpense')}
          >
            ADD EXPENSE
          </button>
          <button 
            className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            GROUPS
          </button>
        </div>
      </div>

      <div className="content">
        {activeTab === 'addExpense' ? <AddExpense /> : <GroupExpense />}
      </div>
    </div>
  );
};

export default HomePage;