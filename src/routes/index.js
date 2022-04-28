const router = require("express").Router();
const godownController = require("../controller/godown/godownController");
const medicineController = require("../controller/medicine/medicineController");

router.use("/godown", godownController);
router.use("/medicine", medicineController);

module.exports = router;
