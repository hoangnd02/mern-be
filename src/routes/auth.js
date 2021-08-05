const express = require("express");
const { signup, signin } = require("../controller/admin/auth");
const router = express.Router();
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");
const { requireSignin } = require("../common-midleware");
const { signout } = require("../controller/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

// router.post("/profile", (req, res) => {
//   res.json({
//     message: "ok",
//   });
// });

router.post("/signout", requireSignin, signout);

module.exports = router;
