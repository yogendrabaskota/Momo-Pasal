import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile, logOut } from "../../../store/authSlice";
import { fetchCartItems } from "../../../store/cartSlice";
import { useEffect } from "react";
import logo from "../../../../public/logo.png";
import {
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
  const { data: user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchProfile());
  }, [dispatch]);

  const isLoggedIn = user?.length > 0 || localStorage.getItem("token");

  return (
    <nav
      className="fixed z-10 w-full bg-white shadow-sm"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-10 h-10" alt="Digital MoMo logo" />
            <span
              className="ml-2 text-2xl font-bold"
              style={{ color: "#E63946" }}
            >
              Digital <span style={{ color: "#2D3142" }}>MoMo</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="flex items-center font-medium transition-colors duration-200 hover:text-red-500"
                  style={{ color: "#2D3142" }}
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              )}

              {items.length > 0 && (
                <div
                  className="relative flex items-center cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <FaShoppingCart className="mr-2" />
                  <span
                    className="font-medium transition-colors duration-200 hover:text-red-500"
                    style={{ color: "#2D3142" }}
                  >
                    Cart
                  </span>
                  <span
                    className="absolute -top-2 -right-5 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                  >
                    {items.length}
                  </span>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/register"
                    className="flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    style={{
                      border: "1px solid #E63946",
                      color: "#E63946",
                      backgroundColor: "transparent",
                    }}
                  >
                    <FaUserPlus className="mr-2" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogOut}
                  className="flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: "#2D3142",
                    color: "white",
                  }}
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {items.length > 0 && (
              <div
                className="relative mr-4 cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart size={20} style={{ color: "#2D3142" }} />
                <span
                  className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: "#E63946",
                    color: "white",
                  }}
                >
                  {items.length}
                </span>
              </div>
            )}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-label="Main menu"
              style={{ color: "#2D3142" }}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
