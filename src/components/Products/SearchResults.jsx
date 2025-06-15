import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // adjust the path as per your folder structure

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext); // ✅ useContext for products

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = currentUser?.role || "user";

  const query =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const results = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
  );

  return (
    <div className="container mt-4">
      <h2>Search Results for: "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {results.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(
                        role === "admin"
                          ? `/admin/viewproduct/${product.id}`
                          : `/user/viewproduct/${product.id}`
                      );
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
