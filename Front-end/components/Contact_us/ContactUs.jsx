import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section className="contact-wrapper">
      <div className="left-pane">
        <h1>Let’s Connect</h1>
        <p>Have questions or ideas? Reach out and let's build a cleaner digital future together.</p>
        <img src="public/EcoPC.png" alt="E-waste illustration" />
      </div>

      <div className="right-pane">
        <div className="form-glass">
          <h2>Contact Us</h2>
          <p className="subtitle">We’ll get back to you within 24 hours.</p>

          {submitted && <div className="success-msg">✅ Message sent successfully!</div>}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Your Name</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Email</label>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                required
                maxLength="500"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Your Message</label>
              <div className="char-counter">{formData.message.length}/500</div>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
