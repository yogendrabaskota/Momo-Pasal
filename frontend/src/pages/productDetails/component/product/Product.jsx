/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../../../store/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../../../store/cartSlice";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  // Debug logs
  console.log("Product ID from URL:", productId);

  const { selectedProduct, selectedProductReviews, status } = useSelector(
    (state) => {
      console.log("Current Redux state:", state.product);
      return state.product;
    }
  );

  const { data: user } = useSelector((state) => state.auth);

  const product = selectedProduct;
  const reviews = selectedProductReviews || [];
  const images =
    product?.productImages || [product?.productImage].filter(Boolean);

  useEffect(() => {
    if (!productId) {
      setErrorMessage("Invalid product ID");
      return;
    }

    console.log("Dispatching fetchProductDetails for productId:", productId);
    dispatch(fetchProductDetails(productId))
      .unwrap()
      .then((result) => {
        console.log("Fetch product details success:", result);
        if (!result?.product) {
          setErrorMessage("Product data not found in response");
        }
      })
      .catch((error) => {
        console.error("Fetch product details failed:", error);
        setErrorMessage(error.message || "Failed to load product details");
      });
  }, [dispatch, productId]);

  // Handle case where data loads after initial render
  useEffect(() => {
    if (status === "success" && product) {
      console.log("Product data now available:", product);
      setErrorMessage(""); // Clear any previous errors
    }
  }, [status, product]);

  const handleAddToCart = async () => {
    if (!user && !localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    if (!productId || !product) {
      console.error("Cannot add to cart: missing product data");
      return;
    }
    try {
      const response = await dispatch(addToCart(productId, quantity));
      if (response?.payload?.data) {
        alert("Product added to cart successfully!");
      } else {
        alert("Product added, but.. Please check your cart.");
      }

      // Show success feedback
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (
      product?.productStockQty &&
      newValue > 0 &&
      newValue <= product.productStockQty
    ) {
      setQuantity(newValue);
    }
  };

  // Debug render state
  console.log("Current render state:", {
    status,
    productExists: !!product,
    productId,
    errorMessage,
  });

  if (status === "loading") {
    console.log("Rendering loading state");
    return (
      <div
        className="container mx-auto px-4 py-12"
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Skeleton height={500} className="rounded-xl" />
            <div className="flex gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  height={80}
                  width={80}
                  className="rounded-lg"
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <Skeleton width={300} height={40} className="mb-6" />
            <Skeleton count={4} className="mb-2" />
            <Skeleton width={150} height={30} className="my-4" />
            <Skeleton width={200} height={20} className="my-4" />
            <Skeleton width={120} height={50} className="mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error" || errorMessage || !product) {
    console.log("Rendering error state", {
      status,
      productExists: !!product,
      errorMessage,
    });

    return (
      <div className="text-center py-20" style={{ backgroundColor: "#FFF8F0" }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#E63946" }}>
          {errorMessage || "Product Not Found"}
        </h1>
        <p className="text-lg mb-6" style={{ color: "#2D3142" }}>
          We couldn't find the product you're looking for.
        </p>

        <div className="mb-6 p-4 bg-gray-100 rounded-lg max-w-md mx-auto text-left">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Product ID:</strong> {productId}
          </p>
          <p>
            <strong>Error:</strong>{" "}
            {errorMessage || "No specific error message"}
          </p>
          <p>
            <strong>Product in State:</strong> {product ? "Exists" : "Null"}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: "#E63946",
              color: "white",
            }}
          >
            Back to Products
          </button>
          <button
            onClick={() => dispatch(fetchProductDetails(productId))}
            className="px-6 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: "#2D3142",
              color: "white",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings yet";

  console.log("Rendering product details", product);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-gray-700 hover:text-red-500 transition-colors"
        >
          <FiChevronLeft className="mr-1" size={20} />
          Back to Products
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.productName}
                className="w-full h-96 object-contain p-4"
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.src =
                    "https://via.placeholder.com/500?text=Image+Not+Available";
                }}
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 mt-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.productName} thumbnail ${index}`}
                      className="w-20 h-20 object-cover"
                      onError={(e) => {
                        console.error(
                          "Thumbnail failed to load:",
                          e.target.src
                        );
                        e.target.src =
                          "https://via.placeholder.com/100?text=Thumbnail";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "#2D3142" }}
              >
                {product.productName}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.floor(averageRating) ? (
                      <FaStar key={star} className="text-yellow-400 mr-1" />
                    ) : (
                      <FaRegStar key={star} className="text-yellow-400 mr-1" />
                    )
                  )}
                  <span className="ml-2 text-gray-600">
                    {averageRating} ({reviews.length} reviews)
                  </span>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <FaShareAlt />
                </button>
              </div>

              <p className="text-gray-700 mb-6">{product.productDescription}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="block text-sm font-medium text-gray-500">
                    Status
                  </span>
                  <span
                    className={`font-semibold ${
                      product.productStatus === "In Stock"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.productStatus}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500">
                    Stock
                  </span>
                  <span className="font-semibold">
                    {product.productStockQty}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#E63946" }}
                >
                  Rs.{product.productPrice}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-lg line-through text-gray-500">
                    Rs.{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center mb-8">
                <span className="mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    disabled={quantity >= product.productStockQty}
                  >
                    +
                  </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  {product.productStockQty} available
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.productStockQty <= 0}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    product.productStockQty > 0
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart />
                  {product.productStockQty > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
                <button className="p-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                  <FaHeart />
                </button>
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: "#2D3142" }}
                >
                  Customer Reviews
                </h2>
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-100 py-4 last:border-0"
                  >
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        {[1, 2, 3, 4, 5].map((star) =>
                          star <= review.rating ? (
                            <FaStar
                              key={star}
                              className="text-yellow-400 mr-1"
                              size={14}
                            />
                          ) : (
                            <FaRegStar
                              key={star}
                              className="text-yellow-400 mr-1"
                              size={14}
                            />
                          )
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
