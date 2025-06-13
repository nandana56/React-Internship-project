import React from "react";
import { useNavigate } from "react-router-dom";
import products from "./productData";
import "./TopRatedProducts.css";

const TopRatedProducts = () => {
  const navigate = useNavigate();
  const topRated = products.filter((product) => product.rating >= 4.5);

  const handleView = (id) => {
    navigate(`/user/viewproduct/${id}`);
  };

  return (
    <div className="top-rated-container">
      <h2 className="title">Top Rated Products</h2>
      <div className="product-grid">
        {topRated.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <p className="product-rating">⭐ {product.rating}</p>
            <button
              className="view-button"
              onClick={() => handleView(product.id)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedProducts;
