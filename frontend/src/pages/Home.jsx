import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider';
import MovieSection from '../components/MovieSection';
import api from '../utils/api';

export default function Home() {
    const [topByType, setTopByType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopShows = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous error
                const res = await api.get('/api/shows/type');
                setTopByType(res.data.topByType);
            } catch (err) {
                console.error('Error fetching top shows:', err);
                setError('Something went wrong!');
            } finally {
                setLoading(false);
            }
        };
        fetchTopShows();
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            <HeroSlider />

            {error ? (
                <div className="flex items-center justify-center mt-20 text-red-500 text-lg font-semibold gap-3">
                    <FaExclamationTriangle className="text-2xl" />
                    {error}
                </div>
            ) : loading ? (
                ['Movie', 'Drama', 'Anime'].map(type => (
                    <div key={type} className="px-6 py-4">
                        <h2 className="text-xl font-bold text-yellow-500 mb-4">{type}</h2>
                        <MovieSection loading />
                    </div>
                ))
            ) : (
                topByType.map(({ type, topShows }) => (
                    <div key={type} className="px-6 py-4">
                        <h2 className="text-xl font-bold text-yellow-500 mb-4">{type}</h2>
                        <MovieSection shows={topShows} />
                    </div>
                ))
            )}
        </div>
    );
}
