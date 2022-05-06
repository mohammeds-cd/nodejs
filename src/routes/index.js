const router = require("express").Router();
const godownController = require("../controller/godown/godownController");
const medicineController = require("../controller/medicine/medicineController");
const userRoutes = require("../routes/userRoutes");

router.use("/godown", godownController);
router.use("/medicine", medicineController);
router.use("/user",userRoutes);

module.exports = router;
