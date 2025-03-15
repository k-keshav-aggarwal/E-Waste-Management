import React, { useEffect, useRef } from 'react';
import './Impact.css';
import { animateNumbers } from './animateNumbers'; // Import the animation utility

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
            <img
              src="https://img.freepik.com/free-vector/save-planet-concept-with-people-taking-care-earth_23-2148522570.jpg?t=st=1741588140~exp=1741591740~hmac=69d8d8da0dc090260f106e92ab35f8710c2f1679372612cd8008b7e7cf53db73&w=900"
              alt="LAC"
              className="impact-image_2070"
            />
            <h3>LAC</h3>
            <p>
              <span ref={lacRef_2070}>0</span>+ continuous and continuous impacts every year
            </p>
          </div>
          <div className="impact-item_2070">
            <img
              src="https://img.freepik.com/free-vector/rice-field-terraces-asian-paddy-with-farm-houses_107791-11384.jpg?t=st=1741588230~exp=1741591830~hmac=d8d342f33b99286102106a3b19c47e04d30518b6020b151101bd398ed0f65fc9&w=1380"
              alt="Villages"
              className="impact-image_2070"
            />
            <h3>VILLAGES</h3>
            <p>
              <span ref={villagesRef_2070}>0</span>+ with strong and strong focus to access the country
            </p>
          </div>
          <div className="impact-item_2070">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-business-planning-with-task-list_23-2149164275.jpg?t=st=1741588099~exp=1741591699~hmac=f15e8809fedb525cbf164d732a22a098145656c37331e127b5d429e1ee601832&w=1060"
              alt="Projects"
              className="impact-image_2070"
            />
            <h3>PROJECTS</h3>
            <p>
              <span ref={projectsRef_2070}>0</span>+ received different, and serious improvements
            </p>
          </div>
          <div className="impact-item_2070">
            <img
              src="https://img.freepik.com/free-vector/around-world-concept-illustration_114360-3029.jpg?t=st=1741588334~exp=1741591934~hmac=c640ad3cbcd4bbd1c29685e0ccb3b596b28c56559598ced986a3c56660f878e6&w=900"
              alt="States"
              className="impact-image_2070"
            />
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