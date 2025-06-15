import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // ✅ use context
import "./TopSellingProducts.css";

const TopSellingProducts = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext); // ✅ get products from context
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const salesCount = {};

    storedOrders.forEach((order) => {
      if (order.status !== "Cancelled") {
        order.cartItems.forEach((item) => {
          salesCount[item.id] = (salesCount[item.id] || 0) + item.quantity;
        });
      }
    });

    const topProducts = products
      .filter((product) => salesCount[product.id] > 3)
      .map((product) => ({
        ...product,
        soldCount: salesCount[product.id],
      }))
      .sort((a, b) => b.soldCount - a.soldCount);

    setTopSelling(topProducts);
  }, [products]); // ✅ depend on context products

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
    <div className="top-selling-container">
      <h2 className="title">Top Selling Products</h2>
      {topSelling.length === 0 ? (
        <p>No top-selling products found.</p>
      ) : (
        <div className="product-grid">
          {topSelling.map((product) => (
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

export default TopSellingProducts;
