// Wishlist.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleViewProduct = (product) => {
    navigate("/user/viewproduct", { state: product });
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert("Removed from wishlist");
  };

  if (wishlist.length === 0) {
    return <div className="text-center mt-5">Your wishlist is empty.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Wishlist ❤️</h2>
      <div className="row g-4">
        {wishlist.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card h-100">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.brand}</p>
                <p className="card-text">₹{product.price}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleViewProduct(product)}
                >
                  View
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
