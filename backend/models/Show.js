const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { TYPES, GENRES, COUNTRIES } = require("../utils/showConstants");


const showSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: TYPES, required: true },
    picture: { type: String, required: true },
    genre: { type: [String], enuma: GENRES, required: true },
    year: { type: Number, required: true },
    country: { type: String, enum: COUNTRIES, required: true },
    episodes: { type: Number, default: null },
    rating: { type: Number, min: 0, max: 10, default: null },
});

const Show = mongoose.model('Show', showSchema);

(async () => {
    try {
        const count = await Show.countDocuments();
        if (count === 0) {
            const filePath = path.join(__dirname, '../utils/data.json');
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const showsWithImageUrls = jsonData.map(show => {
                const imageFileName = path.basename(show.pictureUrl);
                const imageUrl = `/images/${imageFileName}`;

                return {
                    ...show,
                    picture: imageUrl,
                };
            });

            await Show.insertMany(showsWithImageUrls);
            console.log("Seeded shows with image URLs.");
        }
    } catch (err) {
        console.error('Error seeding data:', err.message);
    }
})();

module.exports = Show;