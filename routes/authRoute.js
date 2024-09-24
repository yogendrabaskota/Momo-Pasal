const { registerUser, loginUser, forgetPassword } = require("../controller/auth/authController")

const router = require("express").Router()

//routes here

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forget").post(forgetPassword)



module.exports = router
