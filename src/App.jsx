import React, { useState } from 'react'
import './App.css'
import AddExpense from './components/AddExpense'
import GroupExpense from './components/GroupExpense'

function App() {
  const [activeTab, setActiveTab] = useState(null)

  return (
    <div className="App">
      <div className="nav-tabs">
        <button 
          className={`tab-button ${activeTab === 'addExpense' ? 'active' : ''}`}
          onClick={() => setActiveTab('addExpense')}
        >
          ADD EXPENSE
        </button>
        <button 
          className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          GROUPS
        </button>
      </div>

      {activeTab ? (
        activeTab === 'addExpense' ? <AddExpense /> : <GroupExpense />
      ) : (
        <h1 className="main-title">SPLITWISE</h1>
      )}
    </div>
  )
}

export default App