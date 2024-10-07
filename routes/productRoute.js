const { createProduct, getProduct, getProducts } = require("../controller/admin/product/productController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const { multer, storage } = require("../middleware/multerConfig")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()


const upload = multer({storage : storage})
router.route("/product").post(isAuthenticated,restrictTo("admin"),upload.single('productImage'), catchAsync(createProduct)).get(catchAsync(getProducts))
router.route("/product/:id").get(catchAsync(getProduct))


module.exports = router 
