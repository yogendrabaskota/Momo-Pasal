//const Product = require("../../../model/productModel")
const Product = require("../../model/productModel");
const Review = require("../../model/reviewModel");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length == 0) {
    res.status(400).json({
      message: "no Product found",
      data: [],
    });
  } else {
    res.status(200).json({
      message: "Product fetched successfully",
      data: products,
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "please provide id(productid)",
    });
  }

  const product = await Product.findById(id);
  const productReviews = await Review.find({ productId: id }).populate(
    "userId"
  );

  if (!product) {
    return res.status(404).json({
      message: "No product found with that id",
      data: {
        product: null,
        productReviews: [],
      },
    });
  }

  res.status(200).json({
    message: "Product fetched successfully",
    data: {
      product: [product],
      productReviews: productReviews,
    },
  });
};
