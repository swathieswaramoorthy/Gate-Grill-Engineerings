import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Ensure the CSS is inside src/components

const Navbar = () => {
  return (
    <nav className="navbar">
   
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
