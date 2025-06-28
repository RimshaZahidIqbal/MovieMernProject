const express = require("express");
const router = express.Router();
const { getAllShows, getAllShowsConstants, getTop6ShowsByType } = require("../controllers/showController");

router.get('/', getAllShows);
router.get('/constant', getAllShowsConstants);
router.get('/type', getTop6ShowsByType);

module.exports = router;