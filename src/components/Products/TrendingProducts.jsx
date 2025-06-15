import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // ✅ Import ProductContext
import "./TrendingProducts.css";

const TrendingProducts = () => {
  const { products } = useContext(ProductContext); // ✅ Get products from context
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 16);
      setTrending(selected);
    }
  }, [products]); // ✅ Re-run when context changes

  const handleView = (id) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const role = user?.role || "user";
    const path =
      role === "admin"
        ? `/admin/viewproduct/${id}`
        : `/user/viewproduct/${id}`;
    navigate(path);
  };

  return (
    <div className="trending-products-container">
      <h2 className="title">Trending Products</h2>
      {trending.length === 0 ? (
        <p>No trending products found.</p>
      ) : (
        <div className="product-grid">
          {trending.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button
                className="view-button"
                onClick={() => handleView(product.id)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
