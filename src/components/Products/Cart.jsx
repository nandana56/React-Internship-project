import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.userId;

  useEffect(() => {
    if (userId) {
      const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
      const userCart = storedCarts.filter(item => item.userId === userId);
      setCartItems(userCart);
    }
  }, [userId]);

  const updateCart = (updatedCart) => {
    const allCarts = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove old items for this user and add updated ones
    const updatedAllCarts = allCarts.filter(item => item.userId !== userId).concat(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedAllCarts));
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const changeQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(updatedCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const proceedToCheckout = () => {
    alert("Proceeding to checkout");
    navigate("/user/checkout");
  };

  if (cartItems.length === 0) {
    return <div className="container mt-5 text-center">🛒 Your cart is empty.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Your Shopping Cart</h2>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Subtotal</th>
              <th className="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="70"
                      height="70"
                      className="border rounded"
                    />
                    <div>
                      <h6>{item.name}</h6>
                      <small className="text-muted">{item.brand}</small>
                    </div>
                  </div>
                </td>
                <td className="text-center">₹{item.price}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => changeQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </td>
                <td className="text-center">
                  ₹{item.price * item.quantity}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total</td>
              <td className="text-center fw-bold">₹{total}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-end">
        <button className="btn btn-success" onClick={proceedToCheckout}>
          ✅ Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
