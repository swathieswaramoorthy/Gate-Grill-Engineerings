import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shed() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyword = 'shed'; // hardcoded keyword for Shed page

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shed products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shed Products</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center">No shed products found.</p>
      )}
    </div>
  );
}
