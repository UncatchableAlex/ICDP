const { generatePrimeSync } = require("crypto");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In a lobby with others");
  console.log("in lobby");
});

module.exports = router;
