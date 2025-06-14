import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ category, products }) => {
  const navigate = useNavigate();
  const [brandFilter, setBrandFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Extract unique brands for this category
  const brands = [
    ...new Set(products.filter((p) => p.category === category).map((p) => p.brand)),
  ];

  // Save all products to localStorage
  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(products));
  }, [products]);

  // Apply category + filters
  const filteredProducts = products.filter((p) => {
    const inCategory = p.category === category;
    const brandMatch = brandFilter === "All" || p.brand === brandFilter;
    const priceMatch =
      priceFilter === "All" ||
      (priceFilter === "low" && p.price <= 700) ||
      (priceFilter === "mid" && p.price > 700 && p.price <= 1500) ||
      (priceFilter === "high" && p.price > 1500);
    const ratingMatch =
      ratingFilter === "All" || p.rating >= parseFloat(ratingFilter);

    return inCategory && brandMatch && priceMatch && ratingMatch;
  });

  const handleView = (product) => {
    if (user?.role === "admin") {
      navigate(`/admin/viewproduct/${product.id}`, { state: product });
    } else {
      navigate(`/user/viewproduct/${product.id}`, { state: product });
    }
  };

  return (
    <div className="container my-4 pl-container">
      <h2 className="mb-4 text-capitalize pl-title">{category}</h2>

      {/* Filter Section */}
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="All">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="low">Under ₹700</option>
            <option value="mid">₹701 - ₹1500</option>
            <option value="high">Above ₹1500</option>
          </select>
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="All">All Ratings</option>
            <option value="4.5">4.5 & Up</option>
            <option value="4.0">4.0 & Up</option>
            <option value="3.5">3.5 & Up</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm pl-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top pl-card-img"
                  onClick={() => handleView(item)}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title pl-card-title">{item.name}</h5>
                  <p className="card-text fw-bold pl-card-price">₹{item.price}</p>
                 
                  <button
                    className="btn btn-primary mt-auto pl-view-btn"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
