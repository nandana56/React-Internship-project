import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [latestOrderId, setLatestOrderId] = useState(null);

  useEffect(() => {
    const newOrder = location.state;
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (newOrder && newOrder.cartItems) {
      const alreadyExists = storedOrders.some(
        (order) => order.tempId === newOrder.tempId
      );

      if (!alreadyExists) {
        const orderWithMeta = {
          ...newOrder,
          date: new Date().toLocaleString(),
          orderId: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
          status: "Confirmed",
        };

        const updatedOrders = [orderWithMeta, ...storedOrders];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        setOrders(updatedOrders);
        setLatestOrderId(orderWithMeta.tempId);
      } else {
        setOrders(storedOrders);
        setLatestOrderId(newOrder.tempId); // already exists
      }
    } else {
      setOrders(storedOrders);
    }
  }, [location.state]);

  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    const updated = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: "Cancelled" } : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  if (orders.length === 0) {
    return <div className="container mt-5 text-center">No orders found.</div>;
  }

  const newOrders = orders.filter((order) => order.tempId === latestOrderId);
  const oldOrders = orders.filter((order) => order.tempId !== latestOrderId);

  const renderOrderCard = (order, index) => (
    <div key={`${order.orderId}-${index}`} className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Order ID: {order.orderId}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Order Date: {order.date}</h6>

        <div className="mt-3">
          <h6>Items:</h6>
          <ul className="list-group mb-3">
            {order.cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small>Qty: {item.quantity}</small>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <p><strong>Total:</strong> ₹{order.total}</p>
        <p><strong>Payment Method:</strong> {order.form.paymentMethod.toUpperCase()}</p>
        {order.paymentReference && (
          <p><strong>Payment Ref ID:</strong> {order.paymentReference}</p>
        )}
        <p>
          <strong>Status:</strong>{" "}
          <span className={`fw-bold ${order.status === "Cancelled" ? "text-danger" : "text-success"}`}>
            {order.status}
          </span>
        </p>

        <h6 className="mt-3">Shipping Details:</h6>
        <p className="mb-0">{order.form.fullName}</p>
        <p className="mb-0">{order.form.phone}</p>
        <p className="mb-0">
          {order.form.address}, {order.form.city}, {order.form.state} -{" "}
          {order.form.pincode}
        </p>

        {order.status !== "Cancelled" && (
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => handleCancelOrder(order.orderId)}
          >
            ❌ Cancel Order
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Orders</h2>

      {newOrders.length > 0 && (
        <>
          <h4 className="text-success">Thank you for your order!</h4>
          {newOrders.map(renderOrderCard)}
        </>
      )}

      {oldOrders.length > 0 && (
        <>
          <h4 className="mt-5">📦 Previous Orders</h4>
          {oldOrders.map(renderOrderCard)}
        </>
      )}

      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        🛍 Continue Shopping
      </button>
    </div>
  );
};

export default Order;
