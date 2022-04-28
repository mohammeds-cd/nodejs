const router = require("express").Router();
const godownController = require("../controller/godown/godownController");

router.use("/godown", godownController);

module.exports = router;
