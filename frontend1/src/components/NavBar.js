// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Left: Logo & Hamburger */}
        <div className="left-section">
          <Link to="/" className="logo">
            <img width="150px" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="search-container">
          <Search />
        </div>

        {/* Right: Links */}
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/feedback">FeedBack</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/cart">
              <span id="cart">Cart</span>
              <span id="cart_count">{cartItems?.length || 0}</span>
            </Link>
          </li>
          <li><Link to="/admindashboard"><button>Admin Dashboard</button></Link></li> {/* Admin Dashboard Button */}
          <li><Link to="/login"><button>Login</button></Link></li>
          <li><Link to="/signup"><button>Signup</button></Link></li>
        </ul>
      </nav>

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
    </>
  );
};

export default Navbar;
