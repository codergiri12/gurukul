const router = require("express").Router();

const { registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,getUserDetails} = require("../controllers/auth");

const { isAuthenticatedUser} = require("../middleware/auth");
const { upload } = require("../utils/utils");

router.route("/register").post(upload.none() , registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").post(isAuthenticatedUser, getUserDetails);

router.route("/logout").get(logout);

module.exports = router;