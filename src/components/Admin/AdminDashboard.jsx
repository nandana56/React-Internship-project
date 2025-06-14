import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">View All Users</h5>
              <p className="card-text">Manage all registered users.</p>
              <button className="btn btn-primary" onClick={() => navigate("/admin/viewallusers")}>
                View Users
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">All Orders</h5>
              <p className="card-text">Track and manage customer orders.</p>
              <button className="btn btn-success" onClick={() => navigate("/admin/allorders")}>
                View Orders
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Add New Product</h5>
              <p className="card-text">Add items to your store inventory.</p>
              <button className="btn btn-warning" onClick={() => navigate("/admin/addproduct")}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
