import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ← Fix here
import Search from "./Search";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = ({ cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ← Fix here
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  //-vaish
  const handleLogout =()=> {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/")
  }
  //

  
  return (
    //vaish
    <>
      <nav className="navbar">
        <div className="left-section">
          <Link to="/" className="logo">
            <img width="150px" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>
       {role !== "admin" && (<>
        <div className="search-container">
          <Search />
        </div>
        </>)}


        <ul className="nav-links">
  {isLoggedIn === "true" && role !== "admin" ? (
  <>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/feedback">FeedBack</Link></li>
    <li><Link to="/contact">Contact</Link></li>
    <li>
      <Link to="/cart">
        <span id="cart">Cart</span>
        <span id="cart_count">{cartItems?.length || 0}</span>
      </Link>
    </li>
    <li><button onClick = {()=>{handleLogout();}}>Logout</button></li>
  </>
) : isLoggedIn!=="true"  ? 
  (
  <>
    <li><Link to="/login"><button>Login</button></Link></li>
    <li><Link to="/signup"><button>Signup</button></Link></li>

  </>
): (
  <>
  <li><button onClick = {()=>{handleLogout();}}>Logout</button></li>
  </>
)
}

        </ul>
      



      
      </nav>

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