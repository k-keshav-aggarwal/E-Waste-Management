import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingBag } from 'react-icons/fi';
import './UserComponent.css';

const UserComponent = () => {
  return (
    <div className="user-dashboard">
      <div className="background-dots">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="dot" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="eco-message">
        <h2>Responsible Tech Recycling</h2>
        <p>Your sustainable choices matter</p>
      </div>

      <div className="navigation-grid">
        <Link to="/profile" className="nav-card">
          <div className="card-content">
            <FiUser className="nav-icon" />
            <h3>User Profile</h3>
            <p>Manage your account & recycling history</p>
          </div>
        </Link>

        <Link to="/e-shop" className="nav-card">
          <div className="card-content">
            <FiShoppingBag className="nav-icon" />
            <h3>E-Shop</h3>
            <p>Discover refurbished devices & accessories</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default UserComponent;