import React from 'react';
import { IMAGE_BASE_URL } from "../utils/api";

export default function MovieSection({ shows }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {shows.map(show => (
                <div
                    key={show._id}
                    className="bg-gray-900 p-3 rounded-lg shadow hover:scale-105 transition"
                >
                    {/* Relative wrapper for positioning title & rating */}
                    <div className="relative w-full h-96 overflow-hidden rounded">
                        <img
                            src={`${IMAGE_BASE_URL}${show.picture}`}
                            alt={show.name}
                            className="w-full h-full object-cover"
                        />

                        {/* Title in bottom-left */}
                        <div className="absolute bottom-2 left-2 bg-black/60 text-yellow-400 text-xs md:text-sm px-2 py-1 rounded font-semibold">
                            {show.name}
                        </div>

                        {/* Rating in bottom-right */}
                        <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs md:text-sm px-2 py-1 rounded font-semibold">
                            ⭐ {show.rating}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
