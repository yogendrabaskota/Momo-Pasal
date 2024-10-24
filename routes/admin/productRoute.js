const { createProduct, deleteProduct, editProduct } = require("../../controller/admin/product/productController")
const { getProduct,getProducts } = require("../../controller/global/globalController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const { multer, storage } = require("../../middleware/multerConfig")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()


const upload = multer({storage : storage})
router.route("/")
    .post(isAuthenticated,restrictTo("admin"),upload.single('productImage'), catchAsync(createProduct))
    .get(catchAsync(getProducts))
router.route("/:id")
    .get(catchAsync(getProduct))
    .delete(isAuthenticated,restrictTo("admin"),upload.single('productImage'),catchAsync(deleteProduct))
    .patch(isAuthenticated,restrictTo("admin"),upload.single('productImage'),catchAsync(editProduct))

module.exports = router 
