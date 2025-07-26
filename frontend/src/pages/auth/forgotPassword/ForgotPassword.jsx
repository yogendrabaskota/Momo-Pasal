/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/misc/statuses";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { status, data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      navigate("/verifyotp");
    }
  }, [status]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-sm font-medium"
          style={{ color: "#E63946" }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Login
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
              Reset Password
            </h2>
            <p style={{ color: "#2D3142" }}>
              Enter your email to receive a password reset OTP
            </p>
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
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
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
              {status === STATUSES.LOADING ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPassword;
