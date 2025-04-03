import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import './E_Shop.css';

const E_Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from the backend when the component loads
    axios.get('http://localhost:3000/shop')
      .then(response => {
        // Map the API response to the format expected by our component
        const formattedProducts = response.data.map(product => ({
          id: product.part_id,
          image: 'https://via.placeholder.com/300', // Using a placeholder image, update as needed
          name: product.part_name,
          price: `$${product.price}`,
          details: product.detail
        }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shop data:', error);
        setLoading(false);
      });
  }, []);

  // Filter products based on search term (case-insensitive)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="e-shop-container">
      <div className="title-wrapper">
        <h1 className="e-shop-title">E-Shop</h1>
        <div className="title-underline"></div>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <FaSpinner className="spinner" />
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-container">
                <img 
                  src="\assets\product.jpg"
                  alt={product.name} 
                  className="product-image"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="product-content">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price}</p>
                <p className="product-details">{product.details}</p>
                <button className="product-button">
                  <span className="button-text">Add to Cart</span>
                  <span>🛒</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default E_Shop;
