import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header id="home">
      <h1>RebootEarth</h1>
      <div className={`navbar-container ${isOpen ? "active" : ""}`}>
        <BiX className="navbar-close-icon" onClick={handleNavbar} />
        <nav className="nav-links-1">
          <ul className="link-style">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="login-btn-1">Log In</button>
      </div>
      <BiMenu className="navbar-menu-icon" onClick={handleNavbar} />
    </header>
  );
};

export default Navbar;