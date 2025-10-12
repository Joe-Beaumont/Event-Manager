const express = require("express");
const router = express.Router();
const { googleLogin, googleCallback } = require("../controllers/googleAuth.controller");

router.get("/google", googleLogin);
router.get("/oauth2callback", googleCallback);

module.exports = router;