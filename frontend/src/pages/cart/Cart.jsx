import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, udpateCartItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.cart);

  // Safely calculate totals with null checks
  const totalItemsInCart = products.reduce((total, item) => {
    return item?.quantity ? total + item.quantity : total;
  }, 0);

  const totalAmountOfCart = products.reduce((amount, item) => {
    return item?.product?.productPrice
      ? amount + item.quantity * item.product.productPrice
      : amount;
  }, 0);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(udpateCartItem(productId, newQuantity));
  };

  const handleDelete = (productId) => {
    dispatch(deleteCartItem(productId));
  };

  // Filter out any invalid products before rendering
  const validProducts = products.filter(
    (item) => item?.product && item?.product?.productPrice
  );

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h1
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "#2D3142" }}
        >
          Your Shopping Cart
        </h1>

        {validProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4" style={{ color: "#2D3142" }}>
              {products.length === 0
                ? "Your cart is empty"
                : "Your cart contains invalid items"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: "#E63946",
                color: "white",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {validProducts.map((product) => (
                <div
                  key={product.product._id}
                  className="flex flex-col sm:flex-row gap-4 p-6 rounded-xl shadow-sm"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #FFE66D",
                  }}
                >
                  <img
                    src={product.product.productImage || ""}
                    alt={product.product.productName || "Product image"}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h2
                        className="text-lg font-bold"
                        style={{ color: "#2D3142" }}
                      >
                        {product.product.productName || "Unnamed Product"}
                      </h2>
                      <p
                        className="text-lg font-semibold mt-1"
                        style={{ color: "#E63946" }}
                      >
                        Rs. {product.product.productPrice?.toFixed(2) || "0.00"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      {/* Quantity Controls */}
                      <div
                        className="flex items-center border rounded-lg overflow-hidden"
                        style={{ borderColor: "#FFE66D" }}
                      >
                        <button
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            handleQuantityChange(
                              product.product._id,
                              product.quantity - 1
                            )
                          }
                          style={{ color: "#E63946" }}
                        >
                          <FaMinus size={12} />
                        </button>
                        <input
                          className="w-10 text-center border-none outline-none"
                          type="number"
                          value={product.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.product._id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          style={{ color: "#2D3142" }}
                        />
                        <button
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            handleQuantityChange(
                              product.product._id,
                              product.quantity + 1
                            )
                          }
                          style={{ color: "#E63946" }}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product.product._id)}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors"
                        style={{ color: "#E63946" }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div
                className="p-6 rounded-xl shadow-sm"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #FFE66D",
                }}
              >
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: "#2D3142" }}
                >
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p style={{ color: "#2D3142" }}>Total Items</p>
                    <p style={{ color: "#2D3142" }}>{totalItemsInCart}</p>
                  </div>

                  <div className="border-t pt-4 flex justify-between">
                    <p className="font-bold" style={{ color: "#2D3142" }}>
                      Total Price
                    </p>
                    <p className="font-bold" style={{ color: "#E63946" }}>
                      Rs. {totalAmountOfCart.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    disabled={validProducts.length === 0}
                    className="w-full py-3 rounded-lg font-bold transition-colors mt-6 disabled:opacity-50"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="w-full py-2 rounded-lg font-medium transition-colors mt-2"
                    style={{
                      border: "1px solid #E63946",
                      color: "#E63946",
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
