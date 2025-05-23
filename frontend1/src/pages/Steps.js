import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Steps() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const keywords = ['steps', 'staircase']; // Keywords to filter by

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products`)
      .then(res => res.json())
      .then(data => {
        const allProducts = data.products || [];

        // Filter products containing any of the keywords in name or description
        const filtered = allProducts.filter(product =>
          keywords.some(k =>
            product.name?.toLowerCase().includes(k) ||
            product.description?.toLowerCase().includes(k)
          )
        );

        setProducts(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [keywords]); // ✅ ESLint-compliant dependency array

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Steps & Staircase</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center">No matching products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
