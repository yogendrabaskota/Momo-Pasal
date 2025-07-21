import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full pt-12 pb-6"
      style={{ backgroundColor: "#2D3142", color: "#FFF8F0" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="mb-6">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#E63946" }}
            >
              MOMO <span style={{ color: "#FFE66D" }}>Pasal</span>
            </h3>
            <p className="mb-4">
              Delivering delicious meals to your doorstep since 2023. We&apos;re
              committed to quality food and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: "#FFE66D" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Promotions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: "#FFE66D" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt
                  className="mt-1 mr-3 flex-shrink-0"
                  style={{ color: "#E63946" }}
                />
                <span>123 Food Street, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3" style={{ color: "#E63946" }} />
                <span>+977 9841XXXXXX</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3" style={{ color: "#E63946" }} />
                <span>info@momopasal.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-6">
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: "#FFE66D" }}
            >
              Newsletter
            </h4>
            <p className="mb-4">
              Subscribe to get updates on new dishes and special offers!
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none"
                style={{ color: "#2D3142" }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg font-medium"
                style={{
                  backgroundColor: "#E63946",
                  color: "white",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} MOMO Pasal. All rights reserved. |
            <a href="#" className="hover:text-red-400 ml-2">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-red-400 ml-2">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
