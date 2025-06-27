import React, { useEffect, useState } from 'react';
import { FaUndoAlt } from 'react-icons/fa';

import api from '../utils/api';
import { MovieSection } from '../components';

export default function Explore() {
    const [shows, setShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const [filters, setFilters] = useState({
        year: '',
        type: '',
        country: '',
        genres: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [showsRes, constantsRes] = await Promise.all([
                    api.get('/shows/'),
                    api.get('/shows/constant')
                ]);
                setShows(showsRes.data.shows);
                setGenres(constantsRes.data.genres);
                setCountries(constantsRes.data.countries);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleFilter = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'genres') {
            setFilters(prev => ({
                ...prev,
                genres: checked
                    ? [...prev.genres, value]
                    : prev.genres.filter(g => g !== value)
            }));
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const filtered = shows?.filter(show =>
        (filters.year ? show.year === parseInt(filters.year) : true) &&
        (filters.type ? show.type === filters.type : true) &&
        (filters.country ? show.country === filters.country : true) &&
        (filters.genres.length ? filters.genres.some(g => show.genre.includes(g)) : true)
    );

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className='flex justify-between '>
                <h1 className="text-2xl font-bold text-yellow-400 mb-4">Explore Shows</h1>
                <button
                    onClick={() => setFilters({ year: '', type: '', country: '', genres: [] })}
                    className="flex items-center gap-2 text-base m-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    <FaUndoAlt />
                    Reset Filters
                </button>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">

                <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilter}
                    className="p-2 bg-gray-800 text-white rounded w-full"
                >
                    <option value="">All Years</option>
                    {Array.from({ length: 26 }, (_, i) => 2025 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilter}
                    className="p-2 bg-gray-800 text-white rounded w-full"
                >
                    <option value="">All Types</option>
                    <option value="Movie">Movie</option>
                    <option value="Drama">Drama</option>
                    <option value="Anime">Anime</option>
                </select>
                <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilter}
                    className="p-2 bg-gray-800 text-white rounded w-full"
                >
                    <option value="">All Countries</option>
                    {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>


            <div className="flex flex-wrap gap-3 mb-6">
                {genres.map(g => {
                    const isChecked = filters.genres.includes(g); // check if selected

                    return (
                        <label
                            key={g}
                            className={`text-xs md:text-sm px-3 py-2 rounded cursor-pointer transition
        ${isChecked ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'} hover:bg-red-500`}
                        >
                            <input
                                type="checkbox"
                                name="genres"
                                value={g}
                                onChange={handleFilter}
                                checked={isChecked}
                                className="mr-1 hidden"
                            />
                            {g}
                        </label>
                    );
                })}


            </div>
            <MovieSection shows={filtered} />
        </div>
    );
}
