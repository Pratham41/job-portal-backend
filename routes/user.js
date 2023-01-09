const router = require("express").Router();
const { loginUser, registerUser } = require("../controller/user");
// MIDDLEWARES
const { protect } = require("../middleware/auth");
const {userValidation, userLoginValidation} = require("../middleware/user.validator")

router.route("/login").post(userLoginValidation,loginUser);
router.route("/register").post(userValidation,registerUser);

module.exports = router;
