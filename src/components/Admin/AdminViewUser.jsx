// components/Admin/AdminViewUser.jsx
import React from "react";
import { useParams } from "react-router-dom";

const AdminViewUser = () => {
  const { id } = useParams();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Get user by userId (from URL param)
  const user = users.find((u) => u.userId === id);

  // Get all orders for this user (match by userId)
  const userOrders = orders.filter((order) => order.userId === user?.userId);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    window.location.reload(); // force refresh to reflect change
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {user.firstName} {user.lastName}
          </h5>
          <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="card-text mb-1"><strong>Phone:</strong> {user.phone}</p>
          <p className="card-text mb-1"><strong>Address:</strong></p>
          <p className="ms-3">
            {user.address}<br />
            {user.city}, {user.state} - {user.zip}<br />
            {user.country}
          </p>
        </div>
      </div>

      <h3>Orders ({userOrders.length})</h3>
      {userOrders.length === 0 ? (
        <p>This user has not placed any orders.</p>
      ) : (
        userOrders.map((order, idx) => (
          <div className="card mb-3" key={idx}>
            <div className="card-header d-flex justify-content-between">
              <span><strong>Order ID:</strong> {order.id}</span>
              <span><strong>Payment:</strong> {order.paymentReference || "N/A"}</span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Shipping Details</h5>
              <p className="card-text mb-1">
                <strong>Name:</strong> {order.form.fullName}<br />
                <strong>Phone:</strong> {order.form.phone}<br />
                <strong>Address:</strong> {order.form.address}, {order.form.city}, {order.form.state} - {order.form.pincode}
              </p>
              <p className="mb-1">
                <strong>Payment Method:</strong> {order.form.paymentMethod.toUpperCase()}
              </p>

              <h6 className="mt-3">Items:</h6>
              <ul className="list-group">
                {order.cartItems.map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    <span>{item.name} (Qty: {item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>₹{order.total}</strong>
                </li>
              </ul>

              <div className="mt-3">
                <label><strong>Update Order Status:</strong></label>
                <select
                  className="form-select mt-2"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={order.status === "Cancelled"}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {order.status === "Cancelled" && (
                  <p className="text-danger mt-2">
                    ⚠️ This order was cancelled by the user and cannot be modified.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminViewUser;
