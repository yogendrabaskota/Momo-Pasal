import { useSelector } from "react-redux";
import { APIAuthenticated } from "../../../http";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { forgotPasswordData } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const data = {
    newPassword,
    confirmPassword,
    email: forgotPasswordData.email,
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      const response = await APIAuthenticated.post("/auth/resetPassword", data);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
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
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-sm font-medium"
          style={{ color: "#E63946" }}
        >
          <FaArrowLeft className="mr-2" />
          Back
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
              Create a new password for your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-3 rounded-lg text-center"
              style={{
                backgroundColor: "#FFEBEE",
                color: "#E53935",
                border: "1px solid #EF9A9A",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                style={{ color: "#E63946" }}
              >
                <FaLock />
              </div>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#FFE66D",
                  color: "#2D3142",
                  backgroundColor: "#FFF8F0",
                  focusRingColor: "#E63946",
                }}
                placeholder="New Password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                style={{ color: "#E63946" }}
              >
                <FaLock />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#FFE66D",
                  color: "#2D3142",
                  backgroundColor: "#FFF8F0",
                  focusRingColor: "#E63946",
                }}
                placeholder="Confirm Password"
                required
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
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
