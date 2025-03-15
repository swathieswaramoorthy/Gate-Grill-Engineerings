import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search"; // Import Search Component
import "./NavBar.css"; // Ensure the CSS is inside src/components

const Navbar = () => {
  return (
    <nav className="navbar">
              <Link to="/"><img width=" 150px " src="/images/logo.png" /></Link>


      {/* Centered Search Bar */}
      <div className="search-container">
        <Search />
      </div>

      {/* Navigation Links */}
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
