import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Ensure this file is inside src/pages

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="welcome-text">Welcome to Shri Balaji Engineering</h1>
      <h2 className="welcome-below">~Discover the best products at amazing prices.
      </h2>
      <div className="content-wrapper">
        <img className="image" src="/images/landingpage.jpg" alt="Landing Page" />
        <div className="landing-content">
          <p>Shri Balaji Engineering Works is a leading engineering solutions provider based in Erode, Tamil Nadu. With a strong reputation for innovation and excellence, we have successfully completed 50+ projects over the past 6 years, delivering high-quality engineering services to our clients.</p>
          <Link to="/home" className="shop-now-btn">Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
