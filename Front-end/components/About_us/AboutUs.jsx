import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section id="about" className="about-us_2060">
      <div className="pic_box_2060"></div> {/* Image will be added via CSS */}
      <div className="container_2060">
        <div className="content_2060">
          <h2>Who We Are</h2>
          <h1>Turning Waste into Sustainable Solutions</h1>
          <p>
            We are a passionate team dedicated to reducing environmental impact
            through innovative e-waste management practices. By transforming
            discarded electronics into valuable resources, we contribute to a
            cleaner, greener, and more sustainable future for all.
          </p>
          <div className="stats_2060">
            <div className="stat_2060">
              <span className="number_2060">98%</span>
              <span className="label_2060">Client Satisfaction Rate</span>
            </div>
            <div className="stat_2060">
              <span className="number_2060">80K+</span>
              <span className="label_2060">Items Recycled</span>
            </div>
            <div className="stat_2060">
              <span className="number_2060">10+</span>
              <span className="label_2060">Years of Industry Experience</span>
            </div>
          </div>
          <a href="https://www.greenbiz.com" target="_blank" rel="noopener noreferrer">
  <button className="learn-more_2060" >Learn More</button>
</a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
