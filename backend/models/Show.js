// models/Show.js

const mongoose = require('mongoose');

const GENRES = [
    'Fantasy',
    'Horror',
    'Science fiction',
    'Comedy',
    'Drama',
    'Mystery',
    'Romance',
    'Western',
    'Action/Adventure',
    'Animation',
    'Crime',
    'Fairy tale',
    'Fiction',
    'Thriller',
    'Action',
    'Dystopian',
    'Historical Fiction',
    'Legend',
    'Magic realism',
    'Space Western',
    'Techno-thriller',
];

const COUNTRIES = [
    'USA',
    'UK',
    'Japan',
    'South Korea',
    'India',
    'China',
    'Pakistan',
    'Turkey',
    'France',
    'Germany',
    'Others',
];

const TYPES = ['Movie', 'Drama', 'Anime', 'Show'];

const showSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: TYPES,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        enum: GENRES,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        enum: COUNTRIES,
        required: true,
    },
    episodes: {
        type: Number,
        default: null,
    },
});

module.exports = mongoose.model('Show', showSchema);
