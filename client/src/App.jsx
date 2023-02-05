import React from "react";
import "./app.scss";
import Home from "./pages/home/Home.jsx";

//This is where the routing will be
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandDetail from "./pages/brands/brandDetail";
import Products from "./pages/product/products";
import Brands from "./pages/brands/brands";
import SignUp from "./pages/user/SignUp";
import Signin from "./pages/user/SignIn";
import UpdatePassword from "./pages/user/updatePassword";
import ForgotPassword from "./pages/user/forgotPassword";
import NewPassword from "./pages/user/newPassword";
import Cart from "./pages/cart/cart";
import ProductDetail from "./pages/product/ProductDetail";
import "./style.css";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:id" element={<BrandDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
