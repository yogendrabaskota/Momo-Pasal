/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/misc/statuses";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, token, status } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser(userData));
      if (status === STATUSES.SUCCESS) {
        navigate("/");
      }
    } catch (error) {
      alert("Something went Wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center mb-6 text-sm font-medium"
          style={{ color: "#E63946" }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </button>

        {/* Card */}
        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden p-8"
          style={{ border: "1px solid #FFE66D" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#2D3142" }}
            >
              Welcome Back!
            </h2>
            <p style={{ color: "#2D3142" }}>Login to your MOMO Pasal account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                style={{ color: "#E63946" }}
              >
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#FFE66D",
                  color: "#2D3142",
                  backgroundColor: "#FFF8F0",
                  focusRingColor: "#E63946",
                }}
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                style={{ color: "#E63946" }}
              >
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#FFE66D",
                  color: "#2D3142",
                  backgroundColor: "#FFF8F0",
                  focusRingColor: "#E63946",
                }}
                placeholder="Password"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgotpassword"
                className="text-sm font-medium hover:underline"
                style={{ color: "#E63946" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-semibold text-lg transition-colors"
              style={{
                backgroundColor: "#E63946",
                color: "white",
                hoverBg: "#C53030",
              }}
              disabled={status === STATUSES.LOADING}
            >
              {status === STATUSES.LOADING ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <div className="text-center mt-4">
              <p style={{ color: "#2D3142" }}>
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium hover:underline"
                  style={{ color: "#E63946" }}
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
