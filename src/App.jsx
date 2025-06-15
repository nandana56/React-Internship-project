import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import TopRatedproducts from "./components/Products/TopRatedproducts";
import KidsWear from "./components/Products/KidsWear";
import MensWear from "./components/Products/MensWear";
import WomensWear from "./components/Products/WomensWear";
import TopSellingproducts from "./components/Products/TopSellingproducts";
import TrendingProducts from "./components/Products/TrendingProducts";
import SearchResults from "./components/Products/SearchResults";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import ForgotPassword from "./components/User/ForgotPassword";
import UserProfile from "./components/User/UserProfile";

import UserAccount from "./components/User/UserAccount";

import EditProduct from "./components/Admin/EditProduct";
import UserLayout from "./components/User/UserLayout";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Unauthorized from "./components/Common/unauthorized";
import ViewProduct from "./components/Products/ViewProduct";
import Wishlist from "./components/Products/Wishlist";
import Cart from "./components/Products/Cart";
import Checkout from "./components/Products/Checkout";
import Order from "./components/Products/Order";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";

import AllOrders from "./components/Admin/AllOrders";
import Addproduct from "./components/Admin/Addproduct";

import Editprofile from "./components/User/Editprofile";


import ViewAllUsers from "./components/Admin/ViewAllUsers";
import AdminViewUser from "./components/Admin/AdminViewUser";



const App = () => {
  
  

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home  />}
          />
          <Route path="/topratedproducts" element={<TopRatedproducts />} />
          <Route path="/topsellingproducts" element={<TopSellingproducts />} />
          <Route path="/trendingproducts" element={<TrendingProducts />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="/kidswear" element={<KidsWear />} />
          <Route path="/menswear" element={<MensWear />} />
          <Route path="/womenswear" element={<WomensWear />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="userprofile" element={<UserProfile />} />
            <Route path="useraccount" element={<UserAccount />} />

            <Route path="editprofile" element={<Editprofile />} />
            <Route path="viewproduct/:id" element={<ViewProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Order />} />
          </Route>

          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/viewallusers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ViewAllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/adminviewuser/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminViewUser />
              </ProtectedRoute>
            }
          />



           <Route
            path="/admin/allorders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllOrders />
              </ProtectedRoute>
            }
          />

           <Route
            path="/admin/addproduct"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Addproduct />
              </ProtectedRoute>
            }
          />

          


          

<Route
  path="/admin/editproduct/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <EditProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/viewproduct/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <ViewProduct />
    </ProtectedRoute>
  }
/>
     
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
