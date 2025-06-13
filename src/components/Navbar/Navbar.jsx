import React from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; 

import './Navbar.css';

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/topratedproducts" },
  { id: 3, name: "Kids Wear", link: "/kidswear" },
  { id: 4, name: "Mens Wear", link: "/menswear" },
  { id: 5, name: "Womens Wear", link: "/womenswear" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/trendingproducts" },
  { id: 2, name: "Best Selling", link: "/topsellingproducts" },
  { id: 3, name: "Top Rated", link: "/topratedproducts" },
];

const Navbar = ({ handleOrderPopup }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = currentUser?.role;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="navbar-wrapper bg-white">
      {/* Top Navbar */}
      <div className="navbar-top py-2 bg-primary-subtle">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/" className="d-flex align-items-center text-decoration-none text-dark fw-bold fs-4">
              <img src={Logo} alt="Logo" className="logo-img me-2" />
              CartCraze
            </Link>
          </div>

          {/* Search + Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Search */}
            <div className="position-relative d-none d-sm-block search-group">
  <input
    type="text"
    className="form-control search-input"
    placeholder="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    }}
  />
  <IoMdSearch
    className="search-icon"
    onClick={() => {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    }}
    style={{ cursor: "pointer" }}
  />
</div>


            {/* Cart - Only for Public/User */}
            {(role !== "admin") && (
              <button  onClick={() => navigate("/user/cart")} className="btn btn-primary d-flex align-items-center gap-2 order-btn">
                
                <FaCartShopping />
              </button>
            )}

            {/* Auth Buttons */}
            {!role && (
              <Link to="/login" className="btn btn-outline-danger">
                Login
              </Link>
            )}

            {/* User Dropdown */}
            {role === "user" && (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                   onClick={() => navigate("/user/userprofile")}
                >
                  Account
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/user/useraccount">User Profile</Link></li>
                  <li><Link className="dropdown-item" to="/user/editprofile">Edit Profile</Link></li>
                  <li><Link className="dropdown-item" to="/user/orders">All Orders</Link></li>
                  <li><Link className="dropdown-item" to="/user/wishlist">Your Wishlist</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}

            {/* Admin Logout */}
            {role === "admin" && (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bg-light">
        <div className="container">
          <ul className="nav justify-content-center py-2">
            {Menu.map((item) => (
              <li className="nav-item" key={item.id}>
                <Link className="nav-link text-dark" to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Trending Dropdown */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Trending Products <FaCaretDown className="ms-1" />
              </a>
              <ul className="dropdown-menu">
                {DropdownLinks.map((link) => (
                  <li key={link.id}>
                    <Link className="dropdown-item" to={link.link}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
