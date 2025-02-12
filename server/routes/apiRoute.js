const express = require("express");
const urlChecker = require("../controllers/urlChecker");
const emailAnalyzer = require("../controllers/emailAnalyze");
const router = express.Router();

router.post("/check_url", urlChecker);
router.post("/analyze_email", emailAnalyzer);

module.exports = router;
