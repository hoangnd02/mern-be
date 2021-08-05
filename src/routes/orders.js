const { requireSignin, adminMiddleware } = require("../common-midleware");
const { addOrder, getOrders, getOrder } = require("../controller/orders");
const router = require("express").Router();

router.post("/addOrder", requireSignin, addOrder);
router.get("/getOrders", requireSignin, getOrders);
router.post("/getOrder", requireSignin, getOrder);

module.exports = router;
