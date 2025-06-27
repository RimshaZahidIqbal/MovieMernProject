const Show = require("../models/Show");
const { GENRES, COUNTRIES } = require("../utils/showConstants");

const getAllShows = async (req, res) => {
    try {
        const total = await Show.countDocuments();
        const shows = await Show.find().sort({ rating: 1 });

        res.json({
            totalShows: total,
            shows,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllShowsConstants = async (req, res) => {
    try {
        res.json({
            genres: GENRES,
            countries: COUNTRIES,
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllShows, getAllShowsConstants };
