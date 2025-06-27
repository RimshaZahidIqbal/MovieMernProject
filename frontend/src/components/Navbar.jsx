import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineExplore } from "react-icons/md";


export default function Navbar() {
    return (
        <nav className="bg-black text-yellow-400 flex justify-between items-center px-6 py-4 shadow-md border-b-2 border-yellow-400/40">
            <Link to="/" className=" flex text-center items-center gap-2 text-2xl *:text-2xl font-bold text-red-500"> <img src="/play.png" alt="logo" className='w-6 h-6' /> MovieVerse</Link>
            <Link to="/explore" className="flex gap-2 items-center hover:text-red-400 transition duration-200"> <MdOutlineExplore size={24} />Explore</Link>
        </nav>
    );
}
