import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import '../E_Shop/E_Shop.css';

const E_Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all"); // State for sorting
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/admin/shop')
      .then(response => {
        const formattedProducts = response.data.map(product => ({
          id: product.item_id,
          image: 'https://via.placeholder.com/300',
          name: product.item_name,
          category: product.category,
          condition: product.item_condition, // Assuming "Working" or "Damaged"
          price: "0",
          center_id: product.center_id,
          addedToShop: false,
        }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shop data:', error);
        setLoading(false);
      });
  }, []);

  const setPrice = (e, productId) => {
    const { value } = e.target;
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, price: value } : product
      )
    );
  };

  const addToShop = async (product) => {
    try {
      const { id: item_id, name: part_name, price, center_id } = product;
      const data = { part_name, price, item_id, center_id };
      const response = await axios.post("http://localhost:3000/admin/shop", data);

      if (response.status === 201) {
        window.alert("Added item to shop successfully");

        // Update the product state to mark it as added
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.id === product.id ? { ...p, addedToShop: true } : p
          )
        );
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error adding item to shop");
    }
  };

  // Filter products based on search and sorting
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      sortBy === "all" ? true : product.condition.toLowerCase() === sortBy
    );

  return (
    <div className="e-shop-container">
      <div className="title-wrapper">
        <h1 className="e-shop-title">E-Shop</h1>
        <div className="title-underline"></div>
      </div>

      {/* Search and Sort Bar */}
      <div className="search-sort-container">
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
      </div>

      {/* Sort Dropdown */}
      <div className="sort-container">
          <label htmlFor="sort">Sort by Condition:</label>
          <select
            id="sort"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="all">All</option>
            <option value="working">Working</option>
            <option value="damaged">Damaged</option>
          </select>
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
                <p className="product-category">{product.category}</p>
                <p className="product-condition">{product.condition}</p>
                <label className="product-price">
                  Price: 
                  <input type="text" required onChange={(e) => setPrice(e, product.id)} value={product.price}/>
                </label>
                <button className="product-button">
                  <span onClick={() => addToShop(product)} className="button-text">
                    {product.addedToShop ? "Added" : "Add items to shop"}
                  </span>
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
