const router = require("express").Router();
const godownController = require("../controller/godown/godownController");
const medicineController = require("../controller/medicine/medicineController");
const userRoutes = require("../routes/userRoutes");
const shopRoutes = require("../routes/shopRoutes");

router.use("/godown", godownController);
router.use("/medicine", medicineController);
router.use("/user", userRoutes);
router.use("/shop", shopRoutes)

module.exports = router;
