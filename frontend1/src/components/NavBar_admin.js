import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ← Fix here
import Search from "./Search";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ← Fix here

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <Link to="/" className="logo">
            <img width="150px" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

       

        <ul className="nav-links">
          <li><Link to="/LandingPage">LogOut</Link></li>

        </ul>
      </nav>

     
    </>
  );
};

export default Navbar;
