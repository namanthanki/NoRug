import React from 'react';
import Typewriter from 'typewriter-effect';
import HomeGridSVG from '../assets/homeGrid.svg';
import { Link } from 'react-router-dom';
const HeroSection = () => {
    return (
        <div className="relative w-full h-screen bg-cover bg-center font-fut" style={{ backgroundImage: `url(${HomeGridSVG})` }}>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h1 className="text-6xl font-semibold mb-4">
                    <Typewriter
                        options={{
                            strings: ['Welcome to NoRug', 'More Utility for RWAs', 'Goodbye Rug Pulls', 'Highly Liquid Token Sales'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </h1>
                <p className="text-lg mb-8 text-gray-300">Innovative Launchpad Soltuion with Canto at Heart!</p>
                <Link to='/create'>
                <button className="flex items-center justify-center py-3 px-6 bg-white text-[#2a2a2a] hover:scale-105 transition duration-300 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg> Get Started
                </button>
                </Link>

            </div>
        </div>
    );
};

export default HeroSection;
