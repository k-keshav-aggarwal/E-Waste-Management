import { useState } from 'react';
import { BiMenu, BiX, BiUser, BiHome, BiInfoCircle, BiPhone, BiStore } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavbar_3050 = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick_3050 = () => {
    navigate('/login');
  };

  const handleLogoutClick_3050 = () => {
    onLogout();
    navigate('/');
  };

  const handleProfileClick_3050 = () => {
    navigate('/profile');
  };

  const handleE_ShopClick_3050 = () => {
    navigate('/e-shop');
  };

  const handleAdminClick_3050 = () => {
    navigate('/admin');
  };

  const scrollToSection_3050 = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header id="home_3050">
      <h1>RebootEarth</h1>
      <div className={`navbar-container_3050 ${isOpen ? 'active_3050' : ''}`}>
        <BiX className="navbar-close-icon_3050" onClick={handleNavbar_3050} />
        <nav className="nav-links_3050">
          <ul className="link-style_3050">
            <li>
              <Link to="/" onClick={() => scrollToSection_3050('home')}>
                <BiHome className="nav-icon_3050" /> Home
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection_3050('about')}>
                <BiInfoCircle className="nav-icon_3050" /> About
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection_3050('contact')}>
                <BiPhone className="nav-icon_3050" /> Contact
              </Link>
            </li>
            {isLoggedIn && userRole === 'no' && (
              <li>
                <Link to="/profile" onClick={handleProfileClick_3050}>
                  <BiUser className="profile-icon_3050" /> Profile
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === 'no' && (
              <li>
                <Link to="/e-shop" onClick={handleE_ShopClick_3050}>
                  <BiStore className="shop-icon_3050" /> e-shop
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === 'yes' && (
              <li>
                <Link to="/admin" onClick={handleAdminClick_3050}>
                  <BiUser className="profile-icon_3050" /> Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {isLoggedIn ? (
          <button className="logout-btn_3050" onClick={handleLogoutClick_3050}>
            Log Out
          </button>
        ) : (
          <button className="login-btn_3050" onClick={handleLoginClick_3050}>
            Log In
          </button>
        )}
      </div>
      <BiMenu className="navbar-menu-icon_3050" onClick={handleNavbar_3050} />
    </header>
  );
};

export default Navbar;