import { Fragment, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/products?" + searchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  }, [searchParams]);

  // Function to handle Exit button
  const handleExit = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <Fragment>
      <h1 id="products_heading">Projects Done</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      {/* Exit Button */}
      <button className="exit-btn" onClick={handleExit}>exit</button>
    </Fragment>
  );
}
