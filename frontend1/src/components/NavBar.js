import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search"; // Import Search Component
import "./NavBar.css"; // Ensure the CSS is inside src/components

const Navbar = ({cartItems}) => {
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
        <Link to="/cart">
        <span id="cart" className="ml-3" color={'black'}>Cart</span>
        <span className="ml-1" id="cart_count">{cartItems?.length || 0}</span>
        </Link> 
        <li><Link to="/feedback">FeedBack</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">
                    <button>Login</button>
                </Link></li>
        <li>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
