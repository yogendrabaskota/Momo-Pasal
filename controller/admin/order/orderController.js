const Order = require("../../../model/orderSchema");

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate({
    path: "items.product",
    model: "Product",
  });
  if (orders.length == 0) {
    return res.status(404).json({
      message: "No order found",
      data: [],
    });
  }
  res.status(200).json({
    message: "orders fetched successfully",
    data: orders,
  });
};

exports.getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(400).json({
      message: "no order found with that id",
    });
  }
  res.status(200).json({
    message: "Single Order Fetched successfully",
    data: order,
  });
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  if (
    !orderStatus ||
    !["pending", "delivered", "cancelled", "ontheway", "preparation"].includes(
      orderStatus.toLowerCase()
    )
  ) {
    return res.status(400).json({
      message: "orderStatus is invalid or should be provided",
    });
  }
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "No order found with that id",
    });
  }
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus,
    },
    { new: true }
  )
    .populate({
      path: "items.product",
      model: "Product",
    })
    .populate("user");
  let necessaryData;
  if (orderStatus === "delivered") {
    necessaryData = updatedOrder.items.map((item) => {
      return {
        quantity: item.quantity,
        productId: item.product._id,
        productStockQty: item.product.productStockQty,
      };
    });

    for (var i = 0; i < necessaryData.length; i++) {
      await Product.findByIdAndUpdate(necessaryData[i].productId, {
        productStockQty:
          necessaryData[i].productStockQty - necessaryData[i].quantity,
      });
    }
  }

  res.status(200).json({
    message: "Order status updated Successfully",
    data: updatedOrder,
  });
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(400).json({
      message: "no order found with that id",
    });
  }
  await Order.findByIdAndDelete(id);
  res.status(200).json({
    message: "Order deleted successfully",
    data: null,
  });
};
