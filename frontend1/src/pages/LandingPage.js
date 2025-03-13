import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Ensure this file is inside src/pages

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Shri Balaji Engineering</h1>
      <p>Discover the best products at amazing prices.</p>
      <Link to="/home" className="shop-now-btn">Shop Now</Link>
    </div>
  );
};

export default LandingPage;
