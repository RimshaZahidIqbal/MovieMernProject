const Show = require("../models/Show");
const { GENRES, COUNTRIES } = require("../utils/showConstants");

const getAllShows = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 25;
        const skip = (page - 1) * limit;
        const total = await Show.countDocuments();
        const shows = await Show.find().skip(skip).limit(limit);

        res.json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
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
