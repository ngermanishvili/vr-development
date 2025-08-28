import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-4 sm:px-8 py-6 sm:py-10">
            <div className="max-w-7xl mx-auto">

                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-8 lg:space-y-0">

                    {/* Logo + Left Links */}
                    <div className="flex flex-col space-y-4 sm:space-y-6">
                        {/* Logo */}
                        <div>
                            <img src="/logo/vr-logo.svg" alt="VR Logo" className="h-6 sm:h-8" />
                        </div>
                        {/* Left Menu */}
                        <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 sm:gap-y-3 text-xs sm:text-sm">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">Projects</a></li>
                            <li><a href="#" className="hover:underline">Opportunities</a></li>
                            <li><a href="#" className="hover:underline">Rental</a></li>
                            <li><a href="#" className="hover:underline">VR Club Card Partners</a></li>
                            <li><a href="#" className="hover:underline">Investment</a></li>
                        </ul>
                    </div>

                    {/* Middle Section - Links & Download */}
                    <div className="flex flex-col sm:flex-row sm:space-x-12 lg:space-x-16 space-y-6 sm:space-y-0">
                        {/* Middle Links */}
                        <div className="flex flex-col space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <a href="#" className="hover:underline">About</a>
                            <a href="#" className="hover:underline">Brand resources</a>
                            <a href="#" className="hover:underline">Contact</a>
                        </div>

                        {/* Download Button */}
                        <div>
                            <a href="#" className="text-xs sm:text-sm hover:underline">Download Presentation</a>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center sm:justify-start lg:justify-end">
                        <div className="flex space-x-3 sm:space-x-4">
                            {/* X (Twitter) */}
                            <a href="#" className="hover:opacity-75 transition">
                                <img src="/svg/x.svg" alt="X" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                            </a>
                            {/* Facebook */}
                            <a href="#" className="hover:opacity-75 transition">
                                <img src="/svg/fb.svg" alt="Facebook" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                            </a>
                            {/* Instagram */}
                            <a href="#" className="hover:opacity-75 transition">
                                <img src="/svg/insta.svg" alt="Instagram" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                            </a>
                            {/* YouTube */}
                            <a href="#" className="hover:opacity-75 transition">
                                <img src="/svg/ytb.svg" alt="YouTube" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-gray-800 text-center lg:text-right">
                    <div className="text-xs sm:text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Developed by{" "}
                        <a target="_blank" href="https://frontnback.io/" className="hover:underline text-white">
                            Front & Back
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
