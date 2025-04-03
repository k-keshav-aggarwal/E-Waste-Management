import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import '../E_Shop/E_Shop.css';

const E_Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/admin/shop')
    .then(response => {
      const formattedProducts = response.data.map(product => ({
        part_id: product.part_id,
        id: product.item_id,
        image: 'https://via.placeholder.com/300',
        name: product.part_name || '',
        category: product.category || '',
        condition: product.item_condition || '',
        price: product.price.toString(),
        detail: product.detail,
        center_id: product.center_id,
        updated: false,
      }));
      setProducts(formattedProducts);
      setLoading(false);
    })
      .catch(error => {
        console.error('Error fetching shop data:', error);
        setLoading(false);
      });
  }, []);

  const updateShopItem = (product) => {
    const payload = {
      part_id: product.part_id,
      price: parseFloat(product.price),
      detail: product.detail
    };

    axios.put('http://localhost:3000/admin/shop/update', payload)
      .then(response => {
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.id === product.id ? { ...p, updated: true } : p
          )
        );
        
        setTimeout(() => {
          setProducts(prevProducts =>
            prevProducts.map(p =>
              p.id === product.id ? { ...p, updated: false } : p
            )
          );
        }, 2000);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const setProductDetails = (e, productId, field) => {
    const { value } = e.target;
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

  return (
    <div className="e-shop-container">
      <div className="title-wrapper">
        <h1 className="e-shop-title">E-Shop Manager</h1>
        <div className="title-underline"></div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <FaSpinner className="spinner" />
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.part_id} className="product-card">
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
                <div className="product-meta">
                  <p className="product-category">{product.category}</p>
                  <p className={`product-condition ${product.condition.toLowerCase()}`}>
                    {product.condition}
                  </p>
                </div>

                <div className="product-fields">
                  <div className="input-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      onChange={(e) => setProductDetails(e, product.id, 'price')}
                      value={product.price}
                      className="price-input"
                    />
                  </div>

                  <div className="input-group">
                    <label>Product Details</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => setProductDetails(e, product.id, 'detail')}
                      value={product.detail}
                      placeholder="Enter product details"
                      className="detail-input"
                    />
                  </div>
                </div>

                <button 
                  className={`update-button ${product.updated ? 'updated' : ''}`}
                  onClick={() => updateShopItem(product)}
                >
                  {product.updated ? "✓ Updated" : "Update Item"}
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