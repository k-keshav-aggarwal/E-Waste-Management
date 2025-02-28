import { useState, useEffect } from "react"
import "./Hero.css"
import sliderData from "../../public/heroData.js"

const Hero = () => {
  const[index, setIndex] = useState(0)

  // image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [index]);

  // animated bar effect
  useEffect(() => {
    const bar = document.querySelector(".animated-bar-1");
    if (bar) {
      bar.style.animation = "none";  
      void bar.offsetWidth;
      bar.style.animation = "slideRight 15s linear"; 
    }
  }, [index]);

  return (
    <div className="hero-section">
      <div className="slide-img-1" style={{backgroundImage: `url(${sliderData[index].imgURL})`}}></div>
      <div className="slide-text-container">
        <h3 className="img-heading-1">{sliderData[index].heading}</h3>
        <p className="img-caption-1" dangerouslySetInnerHTML={{ __html: sliderData[index].caption }}></p>
      </div>
      <div className="slide-switch-btns">
        <ul>
          { sliderData.map((data, index) => (
            <li key={data.id} onClick={() => setIndex(index)}>{data.heading}</li>
          ))}
        </ul>
      </div>
      <div className="animated-bar-1"></div>
    </div>
  )
}

export default Hero