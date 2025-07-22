/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Navbar from "./globals/components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CheckOut from "./pages/checkout/CheckOut";

import KhaltiSuccess from "./pages/success/KhaltiSuccess";
import UserProfile from "./pages/profile/UserProfile";
import MyOrders from "./pages/myOrders/MyOrders";
import Footer from "./globals/components/footer/Footer";

import VerifyOtp from "./pages/auth/VerifyOtp/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import OrderDetails from "./pages/orderDetails/OrderDetails";

import { io } from "socket.io-client";
export const socket = io("http://localhost:3000/", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/success" element={<KhaltiSuccess />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/myorders/:id" element={<OrderDetails />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyotp" element={<VerifyOtp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
