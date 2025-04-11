import './App.css';
import Home from './pages/Home';

import Footer from './components/Footer';
import Navbar from './components/NavBar'; // Import Navbar
import LandingPage from './pages/LandingPage'; // Import Landing Page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sheds from './pages/Sheds'; 
import Steps from './pages/Steps'; 
import Gates from './pages/Gates'; 
import Windows from './pages/Windows'; 
import Grills from './pages/Grills'; 
import FeedBack from './components/FeedBack'; 
import Contact from './components/Contact'; 





function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <Router>
      <Navbar cartItems={cartItems} />

        <ToastContainer theme='dark' position="top-center"/>
       
        
        <Routes>
        <Route path="/sheds" element={<Sheds />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/gates" element={<Gates />} />
        <Route path="/windows" element={<Windows/>} />
        <Route path="/grills" element={<Grills />} />
        <Route path="/feedback" element={<FeedBack/>}/>
        <Route path="/contact" element={<Contact/>}/>



         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
