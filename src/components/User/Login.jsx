import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import your custom styles

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (loggedInUser) {
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));

      // ✅ Redirect based on role
      if (loggedInUser.role === "admin") {
        navigate("/admindashboard");
      } else if (loggedInUser.role === "user") {
        navigate("/user/userprofile"); 
      } else {
        setError("Unknown role. Access denied.");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container container mt-5">
      <div className="login-card shadow p-4 rounded">
        <h2 className="text-center mb-4 login-title">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control login-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control login-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 login-button">
            Login
          </button>
        </form>

        <div className="text-center mt-3 login-links">
          <p>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </p>
          <p>
            New user? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
