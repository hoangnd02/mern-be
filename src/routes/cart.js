const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controller/cart");
const { requireSignin, adminMiddleware } = require("../common-midleware");

router.post("/cart/addtocart", requireSignin, addItemToCart);
router.post("/cart/getCartItems", requireSignin, getCartItems);
router.post("/cart/removeItem", requireSignin, removeCartItems);

module.exports = router;
