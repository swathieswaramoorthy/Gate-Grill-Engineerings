import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Steps() {
  const [products, setProducts] = useState([]);
  const keyword = 'windows';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Windows</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}
