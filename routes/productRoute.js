const { createProduct } = require("../controller/admin/product/productController")
const isAuthenticated = require("../middleware/isAuthenticated")

const router = require("express").Router()



router.route("/product").post(isAuthenticated,createProduct)

module.exports = router 