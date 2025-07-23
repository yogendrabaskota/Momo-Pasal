/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createOrder } from "../../store/checkoutSlice";
import { STATUSES } from "../../globals/misc/statuses";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIAuthenticated } from "../../http";
import {
  FaRegCreditCard,
  FaMoneyBillWave,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const CheckOut = () => {
  const { items: products } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { status, data } = useSelector((state) => state.checkout);

  const subTotal = products.reduce(
    (amount, item) => item?.quantity * item?.product?.productPrice + amount,
    0
  );
  const shippingAmount = 100;
  const totalAmount = subTotal + shippingAmount;

  const handleOrder = (data) => {
    const orderDetails = {
      shippingAddress: data.shippingAddress,
      totalAmount: totalAmount,
      items: products,
      paymentDetails: {
        method: paymentMethod,
      },
      phoneNumber: data.phoneNumber,
    };
    dispatch(createOrder(orderDetails));
  };

  const proceedForKhaltiPayment = () => {
    const currentOrder = data[data.length - 1];
    if (status === STATUSES.SUCCESS && paymentMethod === "COD") {
      return navigate("/myorders");
    }
    if (status === STATUSES.SUCCESS && paymentMethod === "khalti") {
      const { totalAmount, _id: orderId } = data[data.length - 1];
      handleKhalti(orderId, totalAmount);
    }
  };

  useEffect(() => {
    if (status === STATUSES.SUCCESS && data && data.length > 0) {
      const currentOrder = data[data.length - 1];
      if (paymentMethod === "COD") {
        navigate("/myorders");
      } else if (paymentMethod === "khalti") {
        const { totalAmount, _id: orderId } = currentOrder;
        handleKhalti(orderId, totalAmount);
      }
    }
  }, [status, data, paymentMethod, navigate]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleKhalti = async (orderId, totalAmount) => {
    try {
      const response = await APIAuthenticated.post("/payment", {
        orderId,
        amount: totalAmount,
      });
      if (response.status === 200) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary Section */}
          <div
            className="bg-white rounded-xl shadow-sm p-6"
            style={{ border: "1px solid #FFE66D" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#2D3142" }}
            >
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.product._id}
                    className="flex items-center gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: "#FFF8F0" }}
                  >
                    <img
                      className="w-20 h-20 rounded-lg object-cover"
                      src={product?.product?.productImage}
                      alt={product?.product?.productName}
                    />
                    <div className="flex-1">
                      <h3
                        className="font-semibold"
                        style={{ color: "#2D3142" }}
                      >
                        {product?.product?.productName}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm" style={{ color: "#2D3142" }}>
                          Qty: {product.quantity}
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: "#E63946" }}
                        >
                          Rs. {product?.product?.productPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8" style={{ color: "#2D3142" }}>
                  Your cart is empty
                </p>
              )}
            </div>

            <div className="border-t pt-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#2D3142" }}
              >
                Payment Method
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="cod"
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={handlePaymentChange}
                    className="h-5 w-5"
                    style={{ accentColor: "#E63946" }}
                  />
                  <label htmlFor="cod" className="ml-3 flex items-center">
                    <FaMoneyBillWave
                      className="mr-2"
                      style={{ color: "#E63946" }}
                    />
                    <span style={{ color: "#2D3142" }}>
                      Cash on Delivery (COD)
                    </span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="khalti"
                    type="radio"
                    value="khalti"
                    name="payment"
                    onChange={handlePaymentChange}
                    className="h-5 w-5"
                    style={{ accentColor: "#E63946" }}
                  />
                  <label htmlFor="khalti" className="ml-3 flex items-center">
                    <FaRegCreditCard
                      className="mr-2"
                      style={{ color: "#5C2D91" }}
                    />
                    <span style={{ color: "#2D3142" }}>Pay with Khalti</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div
            className="bg-white rounded-xl shadow-sm p-6"
            style={{ border: "1px solid #FFE66D" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#2D3142" }}
            >
              Payment Details
            </h2>

            <form onSubmit={handleSubmit(handleOrder)}>
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    className="block mb-2 font-medium"
                    style={{ color: "#2D3142" }}
                  >
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.email ? "#E63946" : "#FFE66D",
                      color: "#2D3142",
                      focusRingColor: "#E63946",
                    }}
                    placeholder="your.email@gmail.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm" style={{ color: "#E63946" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    className="block mb-2 font-medium"
                    style={{ color: "#2D3142" }}
                  >
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.phoneNumber ? "#E63946" : "#FFE66D",
                      color: "#2D3142",
                      focusRingColor: "#E63946",
                    }}
                    placeholder="Your Phone Number"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm" style={{ color: "#E63946" }}>
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Shipping Address */}
                <div>
                  <label
                    className="block mb-2 font-medium"
                    style={{ color: "#2D3142" }}
                  >
                    <FaMapMarkerAlt className="inline mr-2" />
                    Shipping Address
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.shippingAddress
                        ? "#E63946"
                        : "#FFE66D",
                      color: "#2D3142",
                      focusRingColor: "#E63946",
                    }}
                    rows="3"
                    placeholder="Your complete shipping address"
                    {...register("shippingAddress", {
                      required: "Shipping address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.shippingAddress && (
                    <p className="mt-1 text-sm" style={{ color: "#E63946" }}>
                      {errors.shippingAddress.message}
                    </p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: "#2D3142" }}>Subtotal</span>
                    <span style={{ color: "#2D3142" }}>
                      Rs. {subTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#2D3142" }}>Shipping</span>
                    <span style={{ color: "#2D3142" }}>
                      Rs. {shippingAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span style={{ color: "#2D3142" }}>Total</span>
                    <span style={{ color: "#E63946" }}>
                      Rs. {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-bold mt-6 transition-colors"
                  style={{
                    backgroundColor:
                      paymentMethod === "khalti" ? "#5C2D91" : "#E63946",
                    color: "white",
                  }}
                  disabled={products.length === 0}
                >
                  {paymentMethod === "khalti"
                    ? "Pay with Khalti"
                    : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
