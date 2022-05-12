const router = require("express").Router();
const userController = require("../controller/user/userController");
const userMiddleware = require("../middleware/userMiddleware");
const encryption = require('../helper/encryption');

router.post("/signup", userMiddleware.signUpValidator, userController.signUp);
router.post("/login", userMiddleware.decrypt, userController.login);
router.post("/assignRole", userMiddleware.checkAdminRole, userController.assignRole);
router.get("/getVerfiedUsers", userController.getVerfiedUsers);
router.get("/getActiveUsers", userController.getActiveUsers);

module.exports = router;
