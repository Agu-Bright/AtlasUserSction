import React from "react";
import "./app.scss";
import Home from "./pages/home/Home.jsx";

//This is where the routing will be
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandDetail from "./pages/brands/brandDetail";
import Products from "./pages/product/products";
import Brands from "./pages/brands/brands";
// import ProductDetail from "./pages/product/productDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brandDetails" element={<BrandDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
