import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../store/authSlice";
import { useEffect } from "react";
import { fetchCartItems } from "../../../store/cartSlice";

const Navbar = () => {
  const { data: user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

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
            <img
              src="../../../../public/logo.png"
              className="w-10 h-10"
              alt="MOMO Pasal logo"
            />
            <span
              className="ml-2 text-2xl font-bold"
              style={{ color: "#E63946" }}
            >
              MOMO <span style={{ color: "#2D3142" }}>Pasal</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                to="/profile"
                className="font-medium transition-colors duration-200 hover:text-red-500"
                style={{ color: "#2D3142" }}
              >
                Profile
              </Link>
              <Link
                to="/wishlist"
                className="font-medium transition-colors duration-200 hover:text-red-500"
                style={{ color: "#2D3142" }}
              >
                Wishlist
              </Link>
              {items.length > 0 && (
                <div
                  className="relative cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
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
              {!user || !localStorage.getItem("token") ? (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    style={{
                      border: "1px solid #E63946",
                      color: "#E63946",
                      backgroundColor: "transparent",
                      hover: {
                        backgroundColor: "#E63946",
                        color: "white",
                      },
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: "#2D3142",
                    color: "white",
                  }}
                >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: "#2D3142" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
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

      {/* Mobile Navigation (would need JS to toggle) */}
      {/* <div className="md:hidden hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link 
                        to="/profile" 
                        className="block px-3 py-2 rounded-md text-base font-medium"
                        style={{ color: '#2D3142' }}
                    >
                        Profile
                    </Link>
                    <Link 
                        to="/wishlist" 
                        className="block px-3 py-2 rounded-md text-base font-medium"
                        style={{ color: '#2D3142' }}
                    >
                        Wishlist
                    </Link>
                    {!user || !localStorage.getItem('token') ? (
                        <div className="mt-4">
                            <button 
                                onClick={() => navigate("/register")}
                                className="block w-full px-3 py-2 rounded-md text-base font-medium mb-2"
                                style={{ 
                                    backgroundColor: '#E63946',
                                    color: 'white'
                                }}
                            >
                                Sign Up
                            </button>
                            <button 
                                onClick={() => navigate("/login")}
                                className="block w-full px-3 py-2 rounded-md text-base font-medium"
                                style={{ 
                                    border: '1px solid #E63946',
                                    color: '#E63946'
                                }}
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handleLogout}
                            className="block w-full px-3 py-2 rounded-md text-base font-medium mt-4"
                            style={{ 
                                backgroundColor: '#2D3142',
                                color: 'white'
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div> */}
    </nav>
  );
};

export default Navbar;
