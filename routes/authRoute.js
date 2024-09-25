const { registerUser, loginUser, forgetPassword, verifyotp, resetPassword } = require("../controller/auth/authController")

const router = require("express").Router()

//routes here

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgetPassword").post(forgetPassword)
router.route("/verifyOtp").post(verifyotp)
router.route("/resetPassword").post(resetPassword)



module.exports = router
