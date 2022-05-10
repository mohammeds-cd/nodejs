const router = require("express").Router();
const shopController = require("../controller/shop/shopController");

router.post("/saveShop", shopController.saveShop);
router.get("/getShops", shopController.getShops);
router.get("/searchMedicine", shopController.searchMedicine);
router.post("/placeOrder", shopController.placeOrder);
router.post("/checkMedicine", shopController.checkMedicine);

module.exports = router;
