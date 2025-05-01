import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      localStorage.setItem('username', formData.username);
      alert('LOGIN SUCCESSFUL');
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Name</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter your Name"
          value={formData.username}
          onChange={handleChange}
        />

        <h2>Password</h2>
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="form-footer">
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <a href="#" className="forgot-password">Forget Password ?</a>
        </div>

        <button type="submit" className="login-button">
          <p>Login</p>
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button type="button" className="social-login facebook">
          <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" />
          Login with Facebook
        </button>

        <button type="button" className="social-login gmail">
          <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Gmail" />
          Login with Gmail
        </button>
      </form>
    </div>
  );
};

export default LoginPage;