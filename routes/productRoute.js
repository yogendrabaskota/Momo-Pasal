const { createProduct } = require("../controller/admin/product/productController")

const router = require("express").Router()



router.route("/product").post(createProduct)

module.exports = router 