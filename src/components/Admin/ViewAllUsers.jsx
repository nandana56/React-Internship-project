// components/Admin/ViewAllUsers.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewAllUsers = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleView = (userId) => {
    navigate(`/admin/adminviewuser/${userId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.city}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleView(user.userId)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllUsers;
