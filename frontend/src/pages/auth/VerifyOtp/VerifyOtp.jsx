import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyotp } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/misc/statuses";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [apiError, setApiError] = useState(null); // Local state for API error
  const navigate = useNavigate();

  const { forgotPasswordData, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const data2 = {
    email: forgotPasswordData.email,
    otp: otp,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); // Clear previous errors
    try {
      await dispatch(verifyotp(data2)).unwrap();
    } catch (error) {
      // Handle the API error response
      setApiError(error.response?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (forgotPasswordData.status === STATUSES.SUCCESS) {
      navigate("/resetPassword");
    }
  }, [forgotPasswordData.status, navigate]);

  return (
    <div
      className="flex items-center justify-center h-screen p-4"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg"
        style={{ border: "1px solid #FFE66D" }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 style={{ color: "#2D3142" }} className="text-2xl font-bold">
              Verify OTP
            </h2>
          </div>

          {/* Error Message Display */}
          {apiError && (
            <div
              className="mb-4 p-3 rounded-lg text-center"
              style={{
                backgroundColor: "#FFEBEE",
                color: "#E53935",
                border: "1px solid #EF9A9A",
              }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E63946"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none"
                style={{
                  borderColor: "#FFE66D",
                  backgroundColor: "#FFF8F0",
                  color: "#2D3142",
                }}
                placeholder="Enter OTP"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium text-white"
              style={{ backgroundColor: "#E63946" }}
              disabled={status === STATUSES.LOADING}
            >
              {status === STATUSES.LOADING ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
