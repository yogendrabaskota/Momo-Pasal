import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/productSlice";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-20" style={{ backgroundColor: "#FFF8F0" }}>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg" style={{ color: "#2D3142" }}>
          Something went wrong while loading products.
        </p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="mt-6 px-6 py-2 rounded-lg font-medium"
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
    <div className="w-full" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="container mx-auto px-6 py-16 md:px-12 lg:px-7">
        <div className="text-center mb-16">
          <h1
            className="text-3xl font-bold md:text-4xl lg:text-5xl mb-4"
            style={{ color: "#2D3142" }}
          >
            Our <span style={{ color: "#E63946" }}>Popular</span> Foods
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#2D3142" }}>
            Discover our most loved dishes that customers keep coming back for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              onClick={() => navigate(`/productdetails/${product._id}`)}
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                <img
                  className="w-full h-56 object-cover"
                  src={product.productImage}
                  alt={product.productName}
                />
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: "#FFE66D",
                    color: "#2D3142",
                  }}
                >
                  {product.productStatus}
                </div>
              </div>

              <div className="p-6">
                <h2
                  className="text-xl font-bold mb-2 truncate"
                  style={{ color: "#2D3142" }}
                >
                  {product.productName}
                </h2>
                <p
                  className="text-gray-600 mb-4 line-clamp-2"
                  style={{ color: "#2D3142" }}
                >
                  {product.productDescription}
                </p>

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
                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Uncomment when you implement addToCart
                      // addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
