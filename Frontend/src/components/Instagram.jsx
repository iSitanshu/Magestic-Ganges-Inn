import React from 'react';
import { assets } from '../assets/assets';

const Instagram = () => {
    const handleIconClick = () => {
        window.open('https://www.instagram.com/majesticganges.inn/', '_blank');
    };

    return (
        <div 
            className="instagram-icon fixed bottom-4 right-4 w-32 h-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center text-white font-semibold"
            onClick={handleIconClick}
        >
            Follow Us
        </div>
    );
};

export default Instagram;