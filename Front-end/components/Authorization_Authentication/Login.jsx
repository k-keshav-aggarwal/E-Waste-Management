import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { BASE_URL } from '../config';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      console.log('Login successful:', response.data);

      // Store email and role in local storage
      localStorage.setItem('email', email);
      localStorage.setItem('role', response.data.role);

      // Pass the role from the response to the App component
      onLogin(response.data.role);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="auth-container_2080">
      <h2>Login</h2>
      {error && <p className="error_2080">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group_2080">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group_2080">
          <label>Password</label>
          <div className="input-wrapper_2080">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password_2080" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <button type="submit" className="auth-btn_2080" disabled={isLoading}>
          {isLoading ? <div className="loading-spinner_2080"></div> : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={handleSignupClick} className="auth-link_2080">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;