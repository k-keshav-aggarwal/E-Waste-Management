import React, { useEffect, useRef } from 'react';
import './Impact.css';
import { animateNumbers } from './animateNumbers'; // Import the animation utility

// 2070

const Impact = () => {
  // Refs for each number element
  const lacRef_2070 = useRef(null);
  const villagesRef_2070 = useRef(null);
  const projectsRef_2070 = useRef(null);
  const statesRef_2070 = useRef(null);

  useEffect(() => {
    // Animate numbers when the component mounts
    if (lacRef_2070.current) animateNumbers(100, lacRef_2070.current);
    if (villagesRef_2070.current) animateNumbers(500, villagesRef_2070.current);
    if (projectsRef_2070.current) animateNumbers(50, projectsRef_2070.current);
    if (statesRef_2070.current) animateNumbers(20, statesRef_2070.current);
  }, []);

  return (
    <section className="impact-section_2070">
      <div className="container_2070">
        <h2>OUR IMPACT</h2>
        <div className="impact-grid_2070">
          <div className="impact-item_2070">
            <h3>LAC</h3>
            <p>
              <span ref={lacRef_2070}>0</span>+ continuous and continuous impacts every year
            </p>
          </div>
          <div className="impact-item_2070">
            <h3>VILLAGES</h3>
            <p>
              <span ref={villagesRef_2070}>0</span>+ with strong and strong focus to access the country
            </p>
          </div>
          <div className="impact-item_2070">
            <h3>PROJECTS</h3>
            <p>
              <span ref={projectsRef_2070}>0</span>+ received different, and serious improvements
            </p>
          </div>
          <div className="impact-item_2070">
            <h3>STATES</h3>
            <p>
              <span ref={statesRef_2070}>0</span>+ received more remediant areas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;