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
    <footer className="footer_2100">
      <div className="footer_logo_2100">
        <h1>RebootEarth</h1>
        <p>Let&apos;s strive for a better Earth!</p>
        <div className="social_links_2100">
          <a className="facebook_2100" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <BiLogoFacebookCircle />
          </a>
          <a className="linkedin_2100" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <BiLogoLinkedin />
          </a>
          <a className="instagram_2100" href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <BiLogoInstagram />
          </a>
        </div>
      </div>

      <div className="footer_nav_links_2100">
        <h3>Quick Links</h3>
        <nav className="nav_links_2_2100">
          <ul className="link_style_2100">
            <li>
              <a href="#home_3050" onClick={() => scrollToSection("home")}>
                <BiHome className="footer_icon_2100" /> Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => scrollToSection("about")}>
                <BiInfoCircle className="footer_icon_2100" /> About
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => scrollToSection("contact")}>
                <BiEnvelope className="footer_icon_2100" /> Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer_contact_details_2100">
        <h3>Get in Touch</h3>
        <div className="phone_1_2100">
          <BiPhone className="footer_logo_2100" />(+91) 1234567890
        </div>
        <div className="email_1_2100">
          <BiLogoGmail className="footer_logo_2100" />RebootEarth@gmail.com
        </div>
        <div className="address_1_2100">
          <BiSolidMap className="footer_logo_2100" />UVCE, Bengaluru
        </div>
      </div>

      <div className="working_hours_2100">
        <h3>Work Hours</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BiSolidTime className="footer_logo_2100" />8 AM - 5 PM, Mon to Fri
        </div>
      </div>
    </footer>
  );
};

export default Footer;
