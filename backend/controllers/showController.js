const Show = require("../models/Show");
const { GENRES, COUNTRIES } = require("../utils/showConstants");

const getAllShows = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Show.countDocuments();
        const shows = await Show.find()
            .sort({ rating: -1 }) // highest rated first
            .skip(skip)
            .limit(limit);

        res.json({
            shows,
            page,
            totalPages: Math.ceil(total / limit),
            totalShows: total,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTop6ShowsByType = async (req, res) => {
    try {
        const types = [...new Set((await Show.distinct("type")))];

        const results = await Promise.all(
            types.map(async (type) => {
                const topShows = await Show.find({ type })
                    .sort({ rating: -1 })
                    .limit(6);

                return {
                    type,
                    topShows,
                };
            })
        );

        res.json({ topByType: results });
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

module.exports = { getAllShows, getAllShowsConstants, getTop6ShowsByType };
