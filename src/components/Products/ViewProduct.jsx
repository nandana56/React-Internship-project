import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";

const ViewProduct = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { products, setProducts } = useContext(ProductContext);
  const [product, setProduct] = useState(state?.product || null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Load product from context or fallback to passed state
  useEffect(() => {
    const found = products.find((item) => String(item.id) === String(id));
    setProduct(found || state?.product || null);
  }, [id, state, products]);

  useEffect(() => {
    if (product && user?.role === "user") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const alreadyInWishlist = wishlist.some((item) => item.id === product.id);
      setIsWishlisted(alreadyInWishlist);
    }
  }, [product, user]);

 const toggleWishlist = () => {
  if (!product || !user?.userId) return;

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.some(
    (item) => item.id === product.id && item.userId === user.userId
  );

  if (exists) {
    wishlist = wishlist.filter(
      (item) => !(item.id === product.id && item.userId === user.userId)
    );
    setIsWishlisted(false);
    alert("Removed from wishlist");
  } else {
    wishlist.push({ ...product, userId: user.userId });
    setIsWishlisted(true);
    alert("Added to wishlist");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};


  const handleAddToCart = () => {
    if (!product || !user?.userId) return;

    const allCarts = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter this user's cart
    const userCart = allCarts.filter((item) => item.userId === user.userId);

    // Check if product already in cart
    const alreadyInCart = userCart.some((item) => item.id === product.id);

    if (alreadyInCart) {
      alert("Already in cart");
      return;
    }

    const newItem = {
      ...product,
      quantity: 1,
      userId: user.userId,
    };

    const updatedAllCarts = [...allCarts, newItem];

    localStorage.setItem("cart", JSON.stringify(updatedAllCarts));
    alert("Added to cart");
  };

  const handleBuyNow = () => {
    if (!product) return;
    const productForCheckout = { ...product, quantity: 1 };
    navigate("/user/checkout", { state: { cartItems: [productForCheckout] } });
  };

  const handleEditProduct = () => {
    if (!product || !product.id) return;
    navigate(`/admin/editproduct/${product.id}`, { state: { product } });
  };

  const handleDeleteProduct = () => {
    if (!product) return;

    const updatedProducts = products.filter(
      (item) => String(item.id) !== String(product.id)
    );

    setProducts(updatedProducts);
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
    alert("Product deleted");

    const categoryPath = product.category.replace(/\s+/g, "").toLowerCase();
    navigate(`/${categoryPath}`);
  };

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid border rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-primary">₹{product.price}</h4>

          <ul className="list-unstyled">
            <li>
              <strong>Brand:</strong> {product.brand}
            </li>
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Rating:</strong> ⭐ {product.rating} / 5
            </li>
            <li>
              <strong>Stock:</strong> In Stock
            </li>
            <li>
              <strong>Delivery:</strong> Usually delivered in 3–5 days
            </li>
            <li>
              <strong>Return Policy:</strong> 7-day replacement only
            </li>
          </ul>

          {user?.role === "user" && (
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
          )}

          {user?.role === "admin" && (
            <div className="d-flex flex-wrap gap-3 mt-3">
              <button
                className="btn btn-outline-primary"
                onClick={handleEditProduct}
              >
                Edit Product
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={handleDeleteProduct}
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>

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
