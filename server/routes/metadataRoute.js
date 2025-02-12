const express = require("express");
const {
  getTotalRequestCount,
  getUserCount,
} = require("../controllers/metadata");
const router = express.Router();

router.get("/totalRequestCount", getTotalRequestCount);
router.get("/userCount", getUserCount);

module.exports = router;
