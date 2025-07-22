const Product = require("../../../model/productModel");
const fs = require("fs");

//const Product = require("../../model/productModel")
exports.createProduct = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      message: "Product Image must be provided",
    });
  }
  let filePath;
  if (!file) {
    filePath =
      "https://static.india.com/wp-content/uploads/2022/09/FotoJet-20.jpg";
  } else {
    filePath = req.file.filename;
  }

  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
  } = req.body;
  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty
  ) {
    return res.status(400).json({
      message:
        "Please provide all productName,description,price,status and stock quantity related data",
    });
  }

  const createdProduct = await Product.create({
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
    productImage: process.env.LIVE_SERVER + filePath,
    // productImage : filePath
  });
  res.status(200).json({
    message: "Product created successfully",
    data: createdProduct,
  });
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        message: "Please provide ID",
      });
    }

    // Find and delete product
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "No product found with that id",
      });
    }

    // Handle image deletion if it exists
    if (product.productImage && process.env.LIVE_SERVER) {
      const lengthToCut = process.env.LIVE_SERVER.length;

      // Only proceed if the image URL starts with LIVE_SERVER
      if (product.productImage.startsWith(process.env.LIVE_SERVER)) {
        const finalFilePathAfterCut = product.productImage.slice(lengthToCut);

        fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
  } = req.body;
  // console.log(productName,productDescription,productPrice,productStatus,productStockQty)
  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty ||
    !id
  ) {
    return res.status(400).json({
      message:
        "Please provide productName,productDescription,productPrice,productStatus,productStockQty",
    });
  }
  const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(400).json({
      message: "No data found with that id",
    });
  }
  const oldProductImage = oldData.productImage;
  const lengthToCut = process.env.LIVE_SERVER.length;
  const finalFilePathAfteCut = oldProductImage.slice(lengthToCut);

  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + finalFilePathAfteCut, (err) => {
      if (err) {
        console.log("Error deleting FIle");
      } else {
        console.log("File deleted successfully");
      }
    });
  }
  const datas = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
      productImage:
        req.file && req.file.filename
          ? process.env.LIVE_SERVER + req.file.filename
          : oldProductImage,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Product Updated successfully",
    data: datas,
  });
};

exports.updateProductStatus = async (req, res) => {
  const { id } = req.params;
  const { productStatus } = req.body;

  if (
    !productStatus ||
    !["available", "unavailable"].includes(productStatus.toLowerCase())
  ) {
    return res.status(400).json({
      message: "productStatus is invalid or should be provided",
    });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "No product found with that id",
    });
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productStatus,
    },
    { new: true }
  );

  res.status(200).json({
    message: "product status updated Successfully",
    data: updatedProduct,
  });
};

exports.updateProductStockAndPrice = async (req, res) => {
  const { id } = req.params;
  const { productStockQty, productPrice } = req.body;

  if (!productStockQty && !productPrice) {
    return res.status(400).json({
      message: "Please provide productStockQty or productPrice",
    });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "No product found with that id",
    });
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productStockQty: productStockQty
        ? productStockQty
        : product.productStockQty,
      productPrice: productPrice ? productPrice : product.productPrice,
    },
    { new: true }
  );

  res.status(200).json({
    message: "product status updated Successfully",
    data: updatedProduct,
  });
};

exports.getOrdersOfAProduct = async (req, res) => {
  const { id: productId } = req.params;

  // check if this productExist or not
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({
      message: "No product Found",
    });
  }
  const orders = await Order.find({ "items.product": productId });
  console.log(orders);

  res.status(200).json({
    message: "Product ORdres fetched",
    data: orders,
  });
};
