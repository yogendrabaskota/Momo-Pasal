const Product = require("../../../model/productModel");
const User = require("../../../model/userModel");
const mongoose = require("mongoose");

// exports.addToCart = async (req, res) => {
//   // userId , productId
//   const userId = req.user.id;
//   const { productId } = req.params;
//   const { quantity = 1 } = req.body;
//   if (!productId) {
//     return res.status(400).json({
//       message: "Please provide ProductId",
//     });
//   }
//   const productExist = await Product.findById(productId);
//   if (!productExist) {
//     return res.status(404).json({
//       message: "No product with that productId",
//     });
//   }
//   const user = await User.findById(userId);
//   // check if that productId already exist or not , yeti xa vaney qty matra badaunu paryo na vaye productId
//   const existingCartItem = user.cart.find((item) =>
//     item.product.equals(productId)
//   );

//   if (existingCartItem) {
//     existingCartItem.quantity += quantity;
//   } else {
//     user.cart.push({
//       product: productId,
//       quantity: quantity,
//     });
//   }
//   await user.save();
//   const updatedUser = await User.findById(userId).populate("cart.product");
//   res.status(200).json({
//     message: "Product added to cart",
//     data: updatedUser.cart,
//   });
// };

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user and update cart
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product already in cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Update quantity if product exists in cart
      user.cart[cartItemIndex].quantity += Number(quantity);
    } else {
      // Add new item to cart
      user.cart.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

    await user.save();

    // Populate product details when returning
    const updatedUser = await User.findById(userId).populate("cart.product");

    return res.status(200).json({
      message: "Product added to cart",
      data: updatedUser.cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getMyCartItems = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate({
    path: "cart.product",
    select: "-productStatus",
  });

  res.status(200).json({
    message: "Cart Item Fetched Successfully",
    data: userData.cart,
  });
};

exports.deleteItemFromCart = async (req, res) => {
  const { productId } = req.params;
  // const {productIds} = req.body
  const userId = req.user.id;
  // check if that product exists or not
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      message: "No product with that productId",
    });
  }
  // get user cart
  const user = await User.findById(userId);
  //     productIds.forEach(productIdd=>{
  //   user.cart =   user.cart.filter(pId=>pId != productIdd) // [1,2,3] ==> 2 ==>fiter ==> [1,3] ==> user.cart = [1,3]

  //     })
  user.cart = user.cart.filter((item) => item.product != productId); // [1,2,3] ==> 2 ==>fiter ==> [1,3] ==> user.cart = [1,3]

  await user.save();
  res.status(200).json({
    message: "Item removed From Cart",
  });
};

exports.updateCartItems = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  const user = await User.findById(userId);
  console.log(user);
  const cartItem = user.cart.find((item) => item.product.equals(productId));
  if (!cartItem) {
    return res.status(404).json({
      message: "No item with that Id",
    });
  }

  cartItem.quantity = quantity;
  await user.save();

  res.status(200).json({
    message: "Item updated successfully",
    data: user.cart,
  });
};
