import React from 'react';

const Footer = () => {
    return (
        <footer className="text-black px-6 md:px-20 py-12" id="footer">
            <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
                {/* Left */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">Majestic Ganges Inn</h2>
                    <p className="text-black max-w-sm">
                        Book your dream vacation with us. Relax, unwind, and indulge in unmatched comfort and elegance.
                    </p>
                </div>

                {/* Center */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3">Company</h2>
                    <ul className="space-y-2 text-black">
                        <li className="hover:text-yellow-500 cursor-pointer">Home</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Book</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Dining</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Location</li>
                        <li className="hover:text-yellow-500 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Right */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
                    <ul className="space-y-2 text-black">
                        <li className="hover:text-yellow-500 cursor-pointer">+1-212-456-7890</li>
                        <li className="hover:text-yellow-500 cursor-pointer">majesticganges@gmail.com</li>
                    </ul>
                </div>
            </div>

            <hr className="border-gray-700" />

            <p className="text-center text-sm text-gray-400 mt-6">
                © 2024 Majestic Ganges Inn. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
