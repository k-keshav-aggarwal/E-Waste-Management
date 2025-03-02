import React from 'react';
import './AboutUs.css'; 

// 2060

const AboutUs = () => {
  return (
    <section id="about" className="about-us_2060">
      <div className="pic_box_2060">
        {/* Placeholder for image or content */}
      </div>
      <div className="container_2060">
        <div className="content_2060">
          <h2>Who We Are</h2>
          <h1>Turning Waste into Sustainable Solutions</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="stats_2060">
            <div className="stat_2060">
              <span className="number_2060">80+</span>
              <span className="label_2060">Projects Done</span>
            </div>
            <div className="stat_2060">
              <span className="number_2060">98%</span>
              <span className="label_2060">Satisfied Clients</span>
            </div>
            <div className="stat_2060">
              <span className="number_2060">10+</span>
              <span className="label_2060">Years Experience</span>
            </div>
          </div>
          <button className="learn-more_2060">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;