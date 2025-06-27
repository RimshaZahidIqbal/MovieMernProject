import React from 'react';
import { IMAGE_BASE_URL } from "../utils/api";
import { FaStar } from 'react-icons/fa';

export default function MovieSection({ shows }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {shows.map(show => (
                <div
                    key={show._id}
                    className="relative group rounded-xl transition-transform hover:scale-105"
                >
                    <div className="relative bg-gray-900  rounded-xl overflow-hidden 
                        hover:shadow-[0_0_15px_2px_rgba(253,224,71,0.2)] 
                        hover:border-2  hover:border-yellow-400 transition-all duration-300">

                        <div className="relative w-full h-96 overflow-hidden rounded-xl z-10">
                            <img
                                src={`${IMAGE_BASE_URL}/api/${show.picture}`}
                                alt={show.name}
                                className="w-full h-full object-cover rounded-xl"
                            />

                            {/* Title */}
                            <div className="absolute bottom-2 left-2 bg-black/60 text-yellow-400 text-xs px-2 py-1 rounded font-semibold">
                                {show.name}
                            </div>

                            {/* Rating */}
                            <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold flex items-center gap-1">
                                <FaStar className="text-yellow-300" /> {show.rating}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
