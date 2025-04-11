import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Menu toggle

  return (
    <>
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Slide-out Menu */}
      {menuOpen && (
        <div className="side-menu">
          <button onClick={() => navigate('/search?keyword=shed')}>Shed</button>
          <button onClick={() => navigate('/search?keyword=steps')}>Steps</button>
          <button onClick={() => navigate('/search?keyword=gate')}>Gates</button>
          <button onClick={() => navigate('/search?keyword=windows')}>Windows</button>
          <button onClick={() => navigate('/search?keyword=grills')}>Grills</button>
        </div>
      )}

      <div className="landing-container">
        <h1 className="welcome-text">Welcome to Shri Balaji Engineering</h1>
        <h2 className="welcome-below">~ Discover the best products at amazing prices ~</h2>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <motion.img
                className="image img-fluid"
                src="/images/landingpage.jpg"
                alt="Landing Page"
                initial={{ y: "-100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              />
            </div>

            <div className="col-lg-6">
              <div className="landing-content">
                <p>
                  Shri Balaji Engineering Works is a leading engineering solutions provider based in
                  Erode, Tamil Nadu. With a strong reputation for innovation and excellence, we have
                  successfully completed <strong>50+ projects</strong> over the past <strong>6 years</strong>, delivering
                  high-quality engineering services to our clients.
                </p>

                <Link to="/home" className="shop-now-btn">Explore Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
