import React from 'react';
import './ContactUs.css';

// 2050

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
  };

  return (
    <section id="contact" className="feedback-section_2050">
      <div className="container_2050">
        <h2>SEND US MESSAGE</h2>
        <p className="subtitle_2050">Let us work with you to create an online strategy that works.</p>
        <form className="feedback-form_2050" onSubmit={handleSubmit}>
          <div className="form-group_2050">
            <input type="text" name="name" placeholder="Your Name *" required />
            <input type="email" name="email" placeholder="Email *" required />
          </div>
          <div className="form-group_2050">
            <textarea name="message" placeholder="Tell us everything" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;