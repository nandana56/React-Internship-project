import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; 

const EditProfile = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormData({ ...currentUser, password: "", confirmPassword: "" });
    }
  }, []);

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
    setSuccess("");

    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zip,
      country,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zip.trim() ||
      !country.trim()
    ) {
      setError("All fields except password are required.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must have at least 4 characters, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character."
        );
        return;
      }
    }

    try {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      users = users.map((user) =>
        user.email === currentUser.email
          ? { ...formData, password: password ? password : user.password }
          : user
      );

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify({ ...formData, password: "" }));

      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/user/userprofile"), 1500);
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="container signup-container mt-5">
      <h2 className="text-center signup-title mb-4">Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

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
            value={formData.email}
            disabled
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            className="form-control signup-input"
            placeholder="Phone Number"
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
              placeholder="ZIP Code"
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
            placeholder="New Password (Optional)"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control signup-input"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 signup-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
