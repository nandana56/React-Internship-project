import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"; // ⬅️ Custom CSS

const UserProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h2 className="user-profile-welcome">Welcome, {user?.firstName}!</h2>
        
      </div>
    </div>
  );
};

export default UserProfile;
