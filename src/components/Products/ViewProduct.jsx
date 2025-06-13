import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ViewProduct = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(state || null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Load product from localStorage if state is null (e.g. on page refresh)
  useEffect(() => {
    if (!state) {
      const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
      const foundProduct = allProducts.find(
        (item) => String(item.id) === String(id)
      );
      setProduct(foundProduct || null);
    }
  }, [id, state]);

  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const alreadyInWishlist = wishlist.some((item) => item.id === product.id);
      setIsWishlisted(alreadyInWishlist);
    }
  }, [product]);

  const toggleWishlist = () => {
    if (!product) return;
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
      alert("Removed from wishlist");
    } else {
      wishlist.push(product);
      setIsWishlisted(true);
      alert("Added to wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleAddToCart = () => {
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.some((item) => item.id === product.id)) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
    } else {
      alert("Already in cart");
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    // Pass the product with quantity 1 to checkout
    const productForCheckout = { ...product, quantity: 1 };
    navigate("/user/checkout", { state: { cartItems: [productForCheckout] } });
  };

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Image */}
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid border rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-primary">₹{product.price}</h4>

          <ul className="list-unstyled">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Rating:</strong> ⭐ {product.rating} / 5</li>
            <li><strong>Stock:</strong> In Stock</li>
            <li><strong>Delivery:</strong> Usually delivered in 3–5 days</li>
            <li><strong>Return Policy:</strong> 7-day replacement only</li>
          </ul>

          <div className="d-flex flex-wrap gap-3 mt-3">
            <button className="btn btn-success" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>

            <button className="btn btn-warning" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={toggleWishlist}
              title="Toggle Wishlist"
            >
              {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      {/* Extra Description */}
      <div className="mt-5">
        <h5>Product Description</h5>
        <p>
          This premium quality <strong>{product.name}</strong> from{" "}
          <strong>{product.brand}</strong> is a must-have in your wardrobe.
          Designed for comfort and style, it's perfect for everyday use and
          special occasions.
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
