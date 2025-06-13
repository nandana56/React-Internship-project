import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./productData";
import "./TopSellingProducts.css";

const TopSellingProducts = () => {
  const navigate = useNavigate();
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const salesCount = {};

    // Count product sales from non-cancelled orders
    storedOrders.forEach((order) => {
      if (order.status !== "Cancelled") {
        order.cartItems.forEach((item) => {
          salesCount[item.id] = (salesCount[item.id] || 0) + item.quantity;
        });
      }
    });

    // Combine with product data and filter for soldCount > 3
    const topProducts = products
      .filter((product) => salesCount[product.id] > 3) // ✅ only include soldCount > 3
      .map((product) => ({
        ...product,
        soldCount: salesCount[product.id],
      }))
      .sort((a, b) => b.soldCount - a.soldCount); // sort by most sold

    setTopSelling(topProducts);
  }, []);

  const handleView = (id) => {
    navigate(`/user/viewproduct/${id}`);
  };

  return (
    <div className="top-selling-container">
      <h2 className="title">Top Selling Products</h2>
      {topSelling.length === 0 ? (
        <p>No top-selling products found.</p>
      ) : (
        <div className="product-grid">
          {topSelling.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              
              <button className="view-button" onClick={() => handleView(product.id)}>
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSellingProducts;
