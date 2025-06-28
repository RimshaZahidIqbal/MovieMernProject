import React, { useEffect, useState } from 'react';
import { FaUndoAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 12;

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const res = await api.get(`/api/shows?page=${page}&limit=${limit}`);
                setShows(res.data.shows);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error('Error fetching shows:', err);
            }
        };
        fetchShows();
    }, [page]);

    useEffect(() => {
        const fetchConstants = async () => {
            try {
                const res = await api.get('/api/shows/constant');
                setGenres(res.data.genres);
                setCountries(res.data.countries);
            } catch (err) {
                console.error('Error fetching constants:', err);
            }
        };
        fetchConstants();
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
        setPage(1); // Reset to first page when filters change
    };

    const filtered = shows?.filter(show =>
        (filters.year ? show.year === parseInt(filters.year) : true) &&
        (filters.type ? show.type === filters.type : true) &&
        (filters.country ? show.country === filters.country : true) &&
        (filters.genres.length ? filters.genres.some(g => show.genre.includes(g)) : true)
    );

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold text-yellow-400 mb-4">Explore Shows</h1>
                <button
                    onClick={() => {
                        setFilters({ year: '', type: '', country: '', genres: [] });
                        setPage(1);
                    }}
                    className="flex items-center gap-2 text-base m-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    <FaUndoAlt />
                    Reset Filters
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select name="year" value={filters.year} onChange={handleFilter} className="p-2 bg-gray-800 text-white rounded w-full">
                    <option value="">All Years</option>
                    {Array.from({ length: 26 }, (_, i) => 2025 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select name="type" value={filters.type} onChange={handleFilter} className="p-2 bg-gray-800 text-white rounded w-full">
                    <option value="">All Types</option>
                    <option value="Movie">Movie</option>
                    <option value="Drama">Drama</option>
                    <option value="Anime">Anime</option>
                </select>
                <select name="country" value={filters.country} onChange={handleFilter} className="p-2 bg-gray-800 text-white rounded w-full">
                    <option value="">All Countries</option>
                    {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                {genres.map(g => {
                    const isChecked = filters.genres.includes(g);
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

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-6 items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className="flex items-center gap-1 text-red-500 underline text-sm md:text-base hover:text-red-400 disabled:opacity-40"
                >
                    <FaChevronLeft /> Previous
                </button>

                <span className="text-red-500 underline text-sm md:text-base">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                    className="flex items-center gap-1 text-red-500 underline text-sm md:text-base hover:text-red-400 disabled:opacity-40"
                >
                    Next <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
