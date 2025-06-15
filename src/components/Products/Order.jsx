import React, { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (user?.userId) {
      const userOrders = allOrders.filter(order => order.userId === user.userId);
      setOrders(userOrders);
    }
  }, []);

  const handleCancelOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Update order status
    const updatedOrders = allOrders.map(order => {
      if (order.id === orderId && order.userId === user.userId) {
        return { ...order, status: "Cancelled" };
      }
      return order;
    });

    // Save and update UI
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    const userOrders = updatedOrders.filter(order => order.userId === user.userId);
    setOrders(userOrders);
  };

  if (!user) {
    return <div className="text-center mt-5">Please log in to view your orders.</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-5">You haven't placed any orders yet.</div>;
  }

  const newOrders = orders.filter(order => order.status === "Pending");
  const previousOrders = orders.filter(order => order.status !== "Pending");

  const renderOrderCard = (order) => (
    <div className="card mb-4" key={order.id}>
      <div className="card-body">
        <h5 className="card-title">Order ID: {order.id}</h5>
        <p className="card-text">
          <strong>Status:</strong>{" "}
          <span className={
            order.status === "Pending"
              ? "text-warning"
              : order.status === "Cancelled"
              ? "text-danger"
              : "text-success"
          }>
            {order.status}
          </span>
        </p>
        <p className="card-text">
          <strong>Total:</strong> ₹{order.total}
        </p>
        <p className="card-text">
          <strong>Payment:</strong> {order.paymentMethod.toUpperCase()}
          {order.paymentReference && ` (${order.paymentReference})`}
        </p>
        <p className="card-text">
          <strong>Shipping to:</strong> {order.form.fullName}, {order.form.address},{" "}
          {order.form.city}, {order.form.state} - {order.form.pincode}
        </p>

        <ul className="list-group mt-3">
          {order.cartItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.name}</strong> <br />
                Qty: {item.quantity}
              </div>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        {order.status === "Pending" && (
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => handleCancelOrder(order.id)}
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Orders 📦</h2>

      {newOrders.length > 0 && (
        <>
          <h4 className="mb-3 text-primary">🕐 New Orders</h4>
          {newOrders.map(renderOrderCard)}
        </>
      )}

      {previousOrders.length > 0 && (
        <>
          <h4 className="mb-3 text-success mt-5">📦 Previous Orders</h4>
          {previousOrders.map(renderOrderCard)}
        </>
      )}
    </div>
  );
};

export default Order;
