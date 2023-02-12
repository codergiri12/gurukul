const router = require("express").Router();

const { registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,getUserDetails} = require("../controllers/auth");

const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").post(isAuthenticatedUser, getUserDetails);

router.route("/logout").get(logout);

module.exports = router;