import { useState } from 'react';
import { BiMenu, BiX, BiUser, BiHome, BiInfoCircle, BiPhone,BiStore } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavbar = () => {
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

  // Function to handle scrolling to sections on the home page
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header id="home">
      <h1>RebootEarth</h1>
      <div className={`navbar-container ${isOpen ? 'active' : ''}`}>
        <BiX className="navbar-close-icon" onClick={handleNavbar} />
        <nav className="nav-links-1">
          <ul className="link-style">
            <li>
              <Link to="/" onClick={() => scrollToSection('home')}>
                <BiHome className="nav-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection('about')}>
                <BiInfoCircle className="nav-icon" /> About
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection('contact')}>
                <BiPhone className="nav-icon" /> Contact
              </Link>
            </li>
            {/* Conditionally render based on userRole */}
            {isLoggedIn && userRole === 'no' && (
              <li>
                <Link to="/profile" onClick={handleProfileClick}>
                  <BiUser className="profile-icon" /> Profile
                </Link>
              </li>
              
            )}
            {isLoggedIn && userRole === 'no' && (
              <li>
                <Link to="/e-shop" onClick={handleE_ShopClick}>
                <BiStore className="shop-icon" /> e-shop
                </Link>
              </li>
              
            )}
            {isLoggedIn && userRole === 'yes' && (
              <li>
                <Link to="/admin" onClick={handleAdminClick}>
                  <BiUser className="profile-icon" /> Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {isLoggedIn ? (
          <button className="logout-btn-1" onClick={handleLogoutClick}>
            Log Out
          </button>
        ) : (
          <button className="login-btn-1" onClick={handleLoginClick}>
            Log In
          </button>
        )}
      </div>
      <BiMenu className="navbar-menu-icon" onClick={handleNavbar} />
    </header>
  );
};

export default Navbar;