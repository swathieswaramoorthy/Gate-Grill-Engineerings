import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import "./LandingPage.css"; 
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="landing-container">
     
      <h1 className="welcome-text">Welcome to Shri Balaji Engineering</h1>
      <h2 className="welcome-below">~ Discover the best products at amazing prices ~</h2>

      
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Side - Animated Image */}
          <div className="col-lg-6 text-center">
            <motion.img
              className="image img-fluid"
              src="/images/landingpage.jpg"
              alt="Landing Page"
              initial={{ y: "-100vh", opacity: 0 }}  // Start off-screen (above)
              animate={{ y: 0, opacity: 1 }} // Move to normal position
              transition={{ type: "spring", stiffness: 120, damping: 12 }} // Smooth bounce effect
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
    <div className="button-group">
        <button className="explore-now-btn" onClick={() => navigate('/search?keyword=shed')}>Shed</button>
        <button className="explore-now-btn" onClick={() => navigate('/search?keyword=steps')}>Steps</button>
        <button className="explore-now-btn" onClick={() => navigate('/search?keyword=gate')}>Gates</button>
        <button className="explore-now-btn" onClick={() => navigate('/search?keyword=windows')}>Windows</button>
        <button className="explore-now-btn" onClick={() => navigate('/search?keyword=grills')}>Grills</button>
      </div>

     </>
  );
};

export default LandingPage;
