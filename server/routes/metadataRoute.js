const express = require("express");
const {
  getTotalRequestCount,
  getUserCount,
  isAdmin,
} = require("../controllers/metadata");
const router = express.Router();

router.get("/totalRequestCount", getTotalRequestCount);
router.get("/userCount", getUserCount);
router.get("/isAdmin", isAdmin);

module.exports = router;
