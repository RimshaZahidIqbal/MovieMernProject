const express = require("express");
const router = express.Router();
const { getAllShows, getAllShowsConstants } = require("../controllers/showController");

router.get('/', getAllShows);
router.get('/constant', getAllShowsConstants);

module.exports = router;