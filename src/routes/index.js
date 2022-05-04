const router = require("express").Router();
const godownController = require("../controller/godown/godownController");
const medicineController = require("../controller/medicine/medicineController");
const userController = require("../controller/user/userController");

router.use("/godown", godownController);
router.use("/medicine", medicineController);
router.use("/user",userController);

module.exports = router;
