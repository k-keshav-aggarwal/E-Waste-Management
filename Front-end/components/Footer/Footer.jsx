import {
  BiLogoFacebookCircle,
  BiLogoLinkedin,
  BiLogoInstagram,
  BiPhone,
  BiLogoGmail,
  BiSolidMap,
  BiSolidTime,
} from "react-icons/bi";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <h1>RebootEarth</h1>
        <p>Let&apos;s strive for a better Earth!</p>
        <div className="social-links">
          <a className="facebook" href="https://www.facebook.com/" target="_blank">
            <BiLogoFacebookCircle />
          </a>
          <a className="linkedIn" href="https://www.linkedin.com/" target="_blank">
            <BiLogoLinkedin />
          </a>
          <a className="instagram" href="https://instagram.com/" target="_blank">
            <BiLogoInstagram />
          </a>
        </div>
      </div>

      <div className="footer-nav-links">
        <h3>Quick Links</h3>
        <nav className="nav-links-2">
          <ul className="link-style">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer-contact-details">
        <h3>Get in Touch</h3>
        <div className="phone-1">
          <BiPhone className="footer-logo" />(+91) 1234567890
        </div>
        <div className="email-1">
          <BiLogoGmail className="footer-logo" />RebootEarth@gmail.com
        </div>
        <div className="address-1">
          <BiSolidMap className="footer-logo" />#123 Fake Street, Bengaluru
        </div>
      </div>

      <div className="working-hours">
        <h3>Work Hours</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BiSolidTime className="footer-logo" />8 AM - 5 PM, Mon to Fri
        </div>
      </div>
    </footer>
  );
};

export default Footer;