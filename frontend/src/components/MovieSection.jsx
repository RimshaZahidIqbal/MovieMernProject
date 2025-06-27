import React from 'react';
import { IMAGE_BASE_URL } from "../utils/api"
export default function MovieSection({ shows }) {
    return (

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {shows.map(show => (
                <div
                    key={show._id}
                    className="bg-gray-900 p-3 rounded-lg shadow hover:scale-105 transition"
                >
                    <div className="w-full h-96 overflow-hidden rounded">
                        <img
                            src={`${IMAGE_BASE_URL}${show.picture}`}
                            alt={show.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-white mt-2 text-center text-sm">{show.name}</div>
                </div>
            ))}
        </div>

    );
}
