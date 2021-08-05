const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-midleware");
const { getAllComments, addComment } = require("../controller/comment");

router.post(
  "/comment/:idProduct",
  requireSignin,
  upload.array("commentImage"),
  addComment
);
router.post("/getAllComments/:idProduct", getAllComments);

module.exports = router;
