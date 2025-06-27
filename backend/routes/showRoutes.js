const express = require("express");
const router = express.Router();
const getAllShows = require("../controllers/showController");

router.get('/', getAllShows);

module.exports = router;