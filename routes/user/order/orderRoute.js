const { getMyOrders, createOrder, updateMyOrder, deleteMyOrder, canncelOrder } = require("../../../controller/user/order/orderController")
const isAuthenticated = require("../../../middleware/isAuthenticated")
const catchAsync = require("../../../services/catchAsync")

const router = require("express").Router()

router.route("/").get(isAuthenticated,catchAsync(getMyOrders)).post(isAuthenticated,catchAsync(createOrder))
router.route("/cancel").patch(isAuthenticated,catchAsync(canncelOrder))
router.route("/:id").patch(isAuthenticated,catchAsync(updateMyOrder)).delete(isAuthenticated,catchAsync(deleteMyOrder))

module.exports = router