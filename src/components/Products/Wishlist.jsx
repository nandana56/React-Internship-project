import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (user?.userId) {
      const userWishlist = storedWishlist.filter(
        (item) => item.userId === user.userId
      );
      setWishlist(userWishlist);
    }
  }, []);

  const handleViewProduct = (productId) => {
    navigate(`/user/viewproduct/${productId}`);
  };

  if (!user) {
    return <div className="text-center mt-5">Please log in to view your wishlist.</div>;
  }

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
                  className="btn btn-primary"
                  onClick={() => handleViewProduct(product.id)}
                >
                  View
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
