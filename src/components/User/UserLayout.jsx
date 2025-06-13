// src/components/User/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      {/* Optional: Add a sidebar, user nav, etc. */}
      <Outlet />
    </div>
  );
};

export default UserLayout;
