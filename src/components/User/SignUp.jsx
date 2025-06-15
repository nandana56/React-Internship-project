import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      country,
      password,
      confirmPassword,
    } = formData;

    // Basic field validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zip.trim() ||
      !country.trim() ||
      !password ||
      !confirmPassword
    ) {
      return setError("All fields are required.");
    }

    if (!validatePhone(phone)) {
      return setError("Phone number must be exactly 10 digits.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!validatePassword(password)) {
      return setError(
        "Password must have at least 4 characters, including 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character."
      );
    }

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        return setError("User with this email already exists.");
      }

      const newUser = {
        userId: Date.now().toString(), // Unique ID
        ...formData,
        role: "user", // Default role
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Error saving user data:", err);
      setError("Failed to save user data.");
    }
  };

  return (
    <div className="container signup-container mt-5">
      <h2 className="text-center signup-title mb-4">Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} noValidate className="signup-form">
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="firstName"
              className="form-control signup-input"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="lastName"
              className="form-control signup-input"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control signup-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            className="form-control signup-input"
            placeholder="Phone Number (10 digits)"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="address"
            className="form-control signup-input"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              name="city"
              className="form-control signup-input"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="state"
              className="form-control signup-input"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="zip"
              className="form-control signup-input"
              placeholder="ZIP / Postal Code"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="country"
            className="form-control signup-input"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control signup-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control signup-input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 signup-button">
          Register
        </button>
      </form>

      <p className="text-center mt-3 signup-login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
