const router = require("express").Router();
const userController = require("../controller/user/userController");
const userMiddleware = require("../middleware/userMiddleware");

router.post("/signup", userMiddleware.signUpValidator, userController.signUp);
router.post("/login", userMiddleware.decrypt, userController.login);
router.get("/getVerfiedUsers", userController.getVerfiedUsers);
router.get("/getActiveUsers", userController.getActiveUsers);

module.exports = router;
