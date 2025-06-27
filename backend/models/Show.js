const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { TYPES, GENRES, COUNTRIES } = require("../utils/showConstants");


const showSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: TYPES, required: true },
    picture: { type: Buffer, required: true }, // image in binary format = buffer
    genre: { type: [String], enum: GENRES, required: true },
    year: { type: Number, required: true },
    country: { type: String, enum: COUNTRIES, required: true },
    episodes: { type: Number, default: null },
    rating: { type: Number, min: 0, max: 10, default: null },
});

const Show = mongoose.model('Show', showSchema);

// Seed data from data.json and image folder
(async () => {
    try {
        const count = await Show.countDocuments();
        if (count === 0) {
            const filePath = path.join(__dirname, '../utils/data.json');
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const showsWithImages = jsonData.map(show => {
                const imageFileName = path.basename(show.pictureUrl);
                const imagePath = path.join(__dirname, '../utils/images', imageFileName);
                const imageBuffer = fs.readFileSync(imagePath);

                return {
                    ...show,
                    picture: imageBuffer,
                };
            });

            await Show.insertMany(showsWithImages);
            console.log("Seeded shows with image data.");
        }
    } catch (err) {
        console.error('Error adding data:', err.message);
    }
})();
