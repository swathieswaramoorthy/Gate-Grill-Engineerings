import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Gates() {
  const [products, setProducts] = useState([]);
  const keyword = 'gates'; // ✅ This is what we're filtering on

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => {
        console.log('Gates products:', data); // Debugging
        setProducts(data.products || []);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gates</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No gates found.</p>
        )}
      </div>
    </div>
  );
}
