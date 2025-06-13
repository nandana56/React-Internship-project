import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import TopRatedproducts from "./components/Products/TopRatedproducts";
import KidsWear from "./components/Products/KidsWear";
import MensWear from "./components/Products/MensWear";
import WomensWear from "./components/Products/Womenswear";
import TopSellingproducts from "./components/Products/TopSellingproducts";
import TrendingProducts from "./components/Products/TrendingProducts";
import SearchResults from "./components/Products/SearchResults"
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import ForgotPassword from "./components/User/ForgotPassword";
import UserProfile from "./components/User/UserProfile";

import UserAccount from "./components/User/UserAccount";

import Editprofile from "./components/User/Editprofile";
import UserLayout from "./components/User/UserLayout";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Unauthorized from "./components/Common/unauthorized";
import ViewProduct from "./components/Products/ViewProduct";
import Wishlist from "./components/Products/Wishlist";
import Cart from "./components/Products/Cart";
import Checkout from "./components/Products/Checkout";
import Order from "./components/Products/Order";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
       
        <Routes>
          <Route
            path="/"
            element={<Home handleOrderPopup={handleOrderPopup} />}
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
           
   <Route path="/wishlist" element={<Wishlist />} />
         

          <Route
  path="/user/*"
  element={
    <ProtectedRoute allowedRoles={['user']}>
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
