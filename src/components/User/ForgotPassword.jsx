import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setEmailExists(true);
    } else {
      setError("Email not found. Please check and try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { newPassword, confirmPassword } = passwordData;

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        return { ...user, password: newPassword };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setSuccess("Password updated successfully! You can now login.");
    setEmailExists(false);
    setEmail("");
    setPasswordData({ newPassword: "", confirmPassword: "" });

    // Optional: Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="forgotpassword-container">
      <h2>Forgot Password</h2>

      {!emailExists ? (
        <form onSubmit={handleEmailSubmit} className="forgotpassword-form" noValidate>
          {error && <p className="forgotpassword-error">{error}</p>}
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgotpassword-input"
          />
          <button type="submit" className="forgotpassword-button">
            Verify Email
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="forgotpassword-form" noValidate>
          {error && <p className="forgotpassword-error">{error}</p>}
          {success && <p className="forgotpassword-success">{success}</p>}

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
            className="forgotpassword-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
            className="forgotpassword-input"
          />
          <button type="submit" className="forgotpassword-button">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
