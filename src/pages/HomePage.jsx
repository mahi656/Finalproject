import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaUsers, FaSignOutAlt } from "react-icons/fa";
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const username = localStorage.getItem('username') || 'User';
  const userInitial = username.charAt(0).toUpperCase();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const confirmLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="page-wrapper">
      <div className="home-container">
        <div className="nav-container">
          <div className="nav-wrapper">
            <div className="nav-buttons">
              <button 
                className="nav-button expense-button"
                onClick={() => navigate('/add-expense')}
              >
                <FaHeart className="tab-icon" />
                <span>Your Expense</span>
              </button>
              <button 
                className="nav-button group-button"
                onClick={() => navigate('/group-expense')}
              >
                <FaUsers className="tab-icon" />
                <span>Group Expense</span>
              </button>
            </div>
            <div 
              className="profile-tab"
              onClick={handleProfileClick}
              style={{ position: 'relative' }}
            >
              <div className="profile-avatar">
                <img src="https://cdn-icons-png.flaticon.com/128/13097/13097633.png" alt="Profile" />
              </div>
              <span>{username}</span>
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="menu-header">
                    <div className="menu-avatar">
                      {userInitial}
                    </div>
                    <div className="menu-user-info">
                      <span className="greeting">Hey!</span>
                      <span className="username">{username}</span>
                    </div>
                  </div>
                  <div 
                    className="menu-item" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                  >
                    <FaSignOutAlt className="menu-icon" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showLogoutConfirm && (
          <div className="logout-overlay">
            <div className="logout-confirm-content">
              <p>Are you sure you want to logout?</p>
              <div className="logout-buttons">
                <button onClick={confirmLogout}>
                  <img src="https://cdn-icons-png.flaticon.com/128/4980/4980658.png" alt="Delete" style={{ width: "25px", height: "25px" }} />
                </button>
                <button onClick={() => setShowLogoutConfirm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>

        <div className="gold-accent accent-1"></div>
        <div className="gold-accent accent-2"></div>
        <div className="teal-accent accent-3"></div>
        <div className="teal-accent accent-4"></div>
        <div className="red-accent accent-5"></div>

        <div className={`logo ${fadeIn ? 'fadeIn' : ''}`}>
          <div className="logo-ring"></div>
          <div className="logo-inner">S</div>
        </div>

        <h1 className="title">Split Expenses Effortlessly</h1>
        <p className="subtitle">Keep track of shared expenses and balances with housemates, trips, groups, friends, and family.</p>

        <div className="button-container">
          <button 
            className="get-started-btn"
            onClick={() => {
              document.querySelector('.features-section').scrollIntoView({ 
                behavior: 'smooth'
              });
            }}
          >
            <p>Get Started</p>
          </button>
          
          <button 
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            <p>Login</p>
          </button>
        </div>
      </div>

      <div className="features-wrapper">
        <div className="features-section">
          <h2 className="features-title">Why Choose Splitwise?</h2>
          <p className="features-subtitle">Simple, reliable, and trusted by millions</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon teal"></div>
              <h3 className="feature-title">Easy Splitting</h3>
              <p className="feature-description">Split bills instantly with friends and family in just a few taps</p>
            </div>
      
            <div className="feature-card">
              <div className="feature-icon coral"></div>
              <h3 className="feature-title">Track Balances</h3>
              <p className="feature-description">Keep track of who owes who and settle up with ease</p>
            </div>
      
            <div className="feature-card">
              <div className="feature-icon gold"></div>
              <h3 className="feature-title">Smart Categories</h3>
              <p className="feature-description">Organize expenses by categories and get insight into your spending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
