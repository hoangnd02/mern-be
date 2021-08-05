const express = require("express");
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../common-midleware");
const { addAddress, getAddress } = require("../controller/address");

router.post("/user/address/create", requireSignin, adminMiddleware, addAddress);
router.post("/user/getaddress", requireSignin, adminMiddleware, getAddress);

module.exports = router;
