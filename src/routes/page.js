const express = require("express");
const router = express.Router();
const { addItemToCart } = require("../controller/cart");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-midleware");
const { createPage, getPage } = require("../controller/page");

router.post(
  "/page/create",
  requireSignin,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);
router.get("/:category/:type", getPage);

module.exports = router;
