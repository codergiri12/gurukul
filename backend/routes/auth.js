const router = require("express").Router();

const { signIn, login } = require("../controllers/auth");

router.post("/signin", signIn);
router.post("/login", login);

module.exports = router;