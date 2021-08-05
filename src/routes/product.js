const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsBySlug,
  getProductDetailById,
} = require("../controller/product");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-midleware");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

router.post(
  "/product/create",
  requireSignin,
  upload.array("productPicture"),
  createProduct
);

router.get("/product/:slug", getProductsBySlug);
router.post("/product/:productId", getProductDetailById);

module.exports = router;
