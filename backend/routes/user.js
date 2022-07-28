const express = require("express");
const getUser = require("../controllers/user.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("HI");
});

module.exports = router;
