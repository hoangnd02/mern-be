const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");
const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/profile", (req, res) => {
  res.json({
    message: "ok",
  });
});

module.exports = router;
