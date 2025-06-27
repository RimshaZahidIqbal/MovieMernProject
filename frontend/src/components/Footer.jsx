import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-gray-950 text-yellow-400 py-8 border-t h-auto border-yellow-600/20">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Left Section */}
                <div>
                    <h2 className="text-red-500 text-xl font-bold mb-2">MovieVerse</h2>
                    <p className="text-sm text-gray-400">
                        Your destination for top-rated movies, animes, and dramas. Made by Rimsha Zahid.
                    </p>
                </div>

                {/* Middle Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm text-yellow-300">
                        <li><a href="/" className="hover:text-yellow-500 transition underline">Home</a></li>
                        <li><a href="/explore" className="hover:text-yellow-500 transition underline">Explore</a></li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex gap-4 text-red-500 text-xl">
                        <a href="#"><FaFacebook className="hover:text-yellow-400" /></a>
                        <a href="#"><FaTwitter className="hover:text-yellow-400" /></a>
                        <a href="#"><FaInstagram className="hover:text-yellow-400" /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="text-center text-gray-500 text-sm mt-6 border-t border-yellow-500/10 pt-4">
                &copy; {new Date().getFullYear()} MovieVerse. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;