import { useEffect, useRef } from 'react';
import TrailingCursor from '../components/TrailingCursor';
import '../styles/TrailingCursor.css';

const Home = () => {
  return (
    <div className="home-container">
      <TrailingCursor />
      <div className="content">
        <div className="logo-section">
          <div className="logo">S</div>
          <h1>Split Expenses Effortlessly</h1>
          <p>Keep track of shared expenses and balances with housemates, trips, groups, friends, and family.</p>
        </div>
        <div className="action-buttons">
          <button className="get-started">GET STARTED</button>
          <button className="login">LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Home;