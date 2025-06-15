import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Filter out cancelled orders
    const activeOrders = storedOrders.filter(
      (order) => order.status?.toLowerCase() !== "cancelled"
    );

    setOrders(activeOrders.sort((a, b) => b.tempId - a.tempId));
    setUsers(storedUsers);
  }, []);

  const getUserName = (order) => {
    const matchedUser = users.find((user) =>
      order.form?.fullName?.includes(user.firstName)
    );
    return matchedUser
      ? `${matchedUser.firstName} ${matchedUser.lastName}`
      : order.form?.fullName || "Unknown";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
         <div key={index} className="card mb-3 p-3 d-flex flex-row justify-content-between align-items-center">
  <div>
    <h6><strong>Order ID:</strong> {order.id}</h6>
    {order.cartItems.map((item, i) => (
      <div key={i} className="d-flex align-items-center my-2">
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            marginRight: "10px",
          }}
        />
        <span>{item.name}</span>
      </div>
    ))}
  </div>
  <div className="text-end">
    <strong>{getUserName(order)}</strong>
  </div>
</div>

        ))
      )}
    </div>
  );
};

export default AllOrders;
