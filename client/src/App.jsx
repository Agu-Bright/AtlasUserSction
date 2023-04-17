import React, { useEffect } from "react";
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
import ProductDetail from "./pages/product/ProductDetail";
import ProtectedRoute from "./routes/protectedRoute";
import Profile from "./pages/user/profile";
import UpdateProfile from "./pages/user/updateProfile";
import { loadUser } from "./redux/actions/userActions";
import ListOrders from "./pages/orders/ListOrders";
import store from "./redux/store";
import Payment from "./pages/cart/Payment";
import "./style.css";
import "./App.css";
import FirstDetaili from "./pages/adminPages/createBrand/FirstDetail";
import OrderDetails from "./pages/orders/OrderDetails";
import HomeAd from "./pages/adminPages/homeAd/HomeAd";
import BrandName from "./pages/adminPages/createBrand/BrandName";
import BrandDetails from "./pages/adminPages/createBrand/BrandDetails";
import BrandType from "./pages/adminPages/createBrand/BrandType";
import BrandLocation from "./pages/adminPages/createBrand/BrandLocation";
import Personal from "./pages/adminPages/createBrand/personal";
import { getMyBrand } from "./redux/actions/brandAction";

import UserProtectedRoute from "./routes/userProtectedRoute";
import NotFound from "./pages/NotFound";
import ScrollTop from "./components/ScrollToTop";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getMyBrand());
  }, []);
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomeAd />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:id" element={<BrandDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<Profile />} exact />
          <Route path="/update-profile" element={<UpdateProfile />} exact />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/firstDetails" element={<FirstDetaili />} />
          <Route path="/brandName" element={<BrandName />} />
          <Route path="/brandDetails" element={<BrandDetails />} />
          <Route path="/brandType" element={<BrandType />} />
          <Route path="/brandLocation" element={<BrandLocation />} />
          <Route path="/personal" element={<Personal />} />
        </Route>
        <Route path="/landingPage" element={<HomeAd />} />
        <Route path="/orders/me" element={<ListOrders />} />
        <Route path="/payment/verify" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
