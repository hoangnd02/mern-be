const express = require("express");
const { initialData } = require("../controller/initialData");
const router = express.Router();

router.get("/initialData", initialData);

module.exports = router;
