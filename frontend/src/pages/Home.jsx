import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import MovieSection from '../components/MovieSection';
import api from '../utils/api';

export default function Home() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        api.get('/api/shows/')
            .then(res => setShows(res.data.shows))
            .catch(err => console.error('Error fetching shows:', err));
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            <HeroSlider />
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-yellow-500 mb-4">Drama</h2>
                <MovieSection shows={shows?.filter(s => s.genre.includes('Drama'))} />
            </div>
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-yellow-500 mb-4">Movie</h2>
                <MovieSection shows={shows?.filter(s => s.type === 'Movie')} />
            </div>
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-yellow-500 mb-4">Anime</h2>
                <MovieSection shows={shows?.filter(s => s.type === 'Anime')} />
            </div>
        </div>
    );
}
