import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
  };

  return (
    <section className="feedback-section">
      <div className="container">
        <h2>SEND US MESSAGE</h2>
        <p className="subtitle">Let us work with you to create an online strategy that works.</p>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name *" required />
            <input type="email" name="email" placeholder="Email *" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Tell us everything" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
