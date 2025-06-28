import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import MovieSection from '../components/MovieSection';
import api from '../utils/api';

export default function Home() {
    const [topByType, setTopByType] = useState([]);

    useEffect(() => {
        api.get('/api/shows/type')
            .then(res => setTopByType(res.data.topByType))
            .catch(err => console.error('Error fetching top shows:', err));
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            <HeroSlider />

            {topByType.map(({ type, topShows }) => (
                <div key={type} className="px-6 py-4">
                    <h2 className="text-xl font-bold text-yellow-500 mb-4">{type}</h2>
                    <MovieSection shows={topShows} />
                </div>
            ))}
        </div>
    );
}
