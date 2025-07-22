import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const token = localStorage.getItem("token");
  const handleDeleteProduct = async (productId, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `https://momo-pasal.onrender.com/api/products/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        // Refresh the product list after successful deletion
        dispatch(fetchProducts());
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (status === "loading") {
    return (
      <div
        className="flex justify-center items-center h-64"
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: "#E63946" }}
        ></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-20" style={{ backgroundColor: "#FFF8F0" }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#E63946" }}>
          Error!
        </h1>
        <p className="text-lg mb-6" style={{ color: "#2D3142" }}>
          Something went wrong while loading products.
        </p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="px-6 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: "#E63946",
            color: "white",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full py-12" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#2D3142" }}>
            Our <span style={{ color: "#E63946" }}>Popular</span> Foods
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#2D3142" }}>
            Discover our most loved dishes that customers keep coming back for
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => handleDeleteProduct(product._id, e)}
                className="absolute top-3 right-3 p-2 rounded-full z-10"
                style={{
                  backgroundColor: "#E63946",
                  color: "white",
                }}
                title="Delete product"
              >
                <FaTrash size={14} />
              </button>

              {/* Product Image */}
              <div
                className="relative cursor-pointer"
                onClick={() => navigate(`/productdetails/${product._id}`)}
              >
                <img
                  className="w-full h-56 object-cover"
                  src={product.productImage}
                  alt={product.productName}
                />
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 flex items-center px-2 py-1 rounded-full bg-white bg-opacity-90">
                  <FaStar className="mr-1" style={{ color: "#FFE66D" }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#2D3142" }}
                  >
                    4.5
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h2
                  className="text-xl font-bold mb-2 truncate cursor-pointer"
                  style={{ color: "#2D3142" }}
                  onClick={() => navigate(`/productdetails/${product._id}`)}
                >
                  {product.productName}
                </h2>
                <p
                  className="text-gray-600 mb-4 line-clamp-2"
                  style={{ color: "#2D3142" }}
                >
                  {product.productDescription}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#E63946" }}
                    >
                      Rs.{product.productPrice}
                    </span>
                    {product.originalPrice && (
                      <span
                        className="ml-2 text-sm line-through"
                        style={{ color: "#2D3142", opacity: 0.6 }}
                      >
                        Rs.{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    className="p-2 rounded-full transition-colors hover:bg-opacity-80"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic would go here
                    }}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
