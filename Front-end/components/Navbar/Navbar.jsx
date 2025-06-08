import { useState } from 'react';
import { BiMenu, BiX, BiUser, BiHome, BiInfoCircle, BiPhone, BiStore } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavbarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleE_ShopClick = () => {
    navigate('/e-shop');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <header className={`navbar ${isOpen ? 'navbar-open' : ''}`}>
      <div className="navbar-container">
        <h1 className="navbar-logo">RebootEarth</h1>
        <nav className="nav-links">
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={() => navigate('/')}>
                <BiHome className="nav-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => navigate('/about')}>
                <BiInfoCircle className="nav-icon" /> About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => navigate('/contact')}>
                <BiPhone className="nav-icon" /> Contact
              </Link>
            </li>
            {isLoggedIn && userRole === 'no' && (
              <li>
                <Link to="/profile" onClick={handleProfileClick}>
                  <BiUser className="nav-icon" /> Profile
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === 'no' && (
              <li>
                <Link to="/e-shop" onClick={handleE_ShopClick}>
                  <BiStore className="nav-icon" /> e-shop
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === 'yes' && (
              <li>
                <Link to="/admin" onClick={handleAdminClick}>
                  <BiUser className="nav-icon" /> Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogoutClick}>Log Out</button>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>Log In</button>
        )}
        <BiMenu className="navbar-menu-icon" onClick={handleNavbarToggle} />
      </div>
    </header>
  );
};

export default Navbar;
