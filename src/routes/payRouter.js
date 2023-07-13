const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/pay.html"));
});

router.get("/complete", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/pay-complete.html"));
});

module.exports = router;
