import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAccount.css"; // ✅ Custom styles for this component only

const UserAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="useraccount-container">
      <div className="useraccount-card">
        <h2 className="useraccount-title">👤 Your Account Details</h2>
        <div className="useraccount-info">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>ZIP Code:</strong> {user.zip}</p>
          <p><strong>Country:</strong> {user.country}</p>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
