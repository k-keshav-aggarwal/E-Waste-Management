import {
  BiLogoFacebookCircle,
  BiLogoLinkedin,
  BiLogoInstagram,
  BiPhone,
  BiLogoGmail,
  BiSolidMap,
  BiSolidTime,
  BiHome,
  BiInfoCircle,
  BiEnvelope,
} from "react-icons/bi";
import "./Footer.css";

const Footer = () => {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <h1>RebootEarth</h1>
          <p>Striving for a greener future</p>
          <div className="social-links">
            <a
              className="facebook"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoFacebookCircle />
            </a>
            <a
              className="linkedin"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoLinkedin />
            </a>
            <a
              className="instagram"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-nav-links">
          <h3>Quick Links</h3>
          <nav>
            <ul>
              <li>
                <a href="#home" onClick={() => scrollToSection("home")}>
                  <BiHome /> Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => scrollToSection("about")}>
                  <BiInfoCircle /> About
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => scrollToSection("contact")}>
                  <BiEnvelope /> Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Details Section */}
        <div className="footer-contact-details">
          <h3>Get in Touch</h3>
          <div>
            <BiPhone />
            (+91) 1234567890
          </div>
          <div>
            <BiLogoGmail />
            rebootearth@gmail.com
          </div>
          <div>
            <BiSolidMap />
            UVCE, Bengaluru
          </div>
        </div>

        {/* Work Hours Section */}
        <div className="footer-working-hours">
          <h3>Work Hours</h3>
          <div>
            <BiSolidTime />
            8 AM - 5 PM, Mon to Fri
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2025 RebootEarth. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
