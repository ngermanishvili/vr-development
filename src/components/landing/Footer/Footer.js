import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-8 py-10">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start">

                {/* Logo + Left Links */}
                <div className="flex flex-col space-y-6 w-full sm:w-auto">
                    {/* Logo */}
                    <div>
                        <img src="/logo/vr-logo.svg" alt="VR Logo" className="h-8" />
                    </div>
                    {/* Left Menu */}
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Projects</a></li>
                        <li><a href="#" className="hover:underline">Opportunities</a></li>
                        <li><a href="#" className="hover:underline">Rental</a></li>
                        <li><a href="#" className="hover:underline">VR Club Card Partners</a></li>
                        <li><a href="#" className="hover:underline">Investment</a></li>
                    </ul>
                </div>

                {/* Middle Links */}
                <div className="flex flex-col space-y-3 text-sm mt-8 sm:mt-0">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Brand resources</a>
                    <a href="#" className="hover:underline">Contact</a>
                </div>

                {/* Download Button */}
                <div className="mt-8 sm:mt-0">
                    <a href="#" className="text-sm hover:underline">Download Presentation</a>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4 mt-8 sm:mt-0">
                    {/* X (Twitter) */}
                    <a href="#" className="hover:opacity-75 transition">
                        <img src="/svg/x.svg" alt="X" className="w-8 h-8" />
                    </a>
                    {/* Facebook */}
                    <a href="#" className="hover:opacity-75 transition">
                        <img src="/svg/fb.svg" alt="Facebook" className="w-8 h-8" />
                    </a>
                    {/* Instagram */}
                    <a href="#" className="hover:opacity-75 transition">
                        <img src="/svg/insta.svg" alt="Instagram" className="w-8 h-8" />
                    </a>
                    {/* YouTube */}
                    <a href="#" className="hover:opacity-75 transition">
                        <img src="/svg/ytb.svg" alt="YouTube" className="w-8 h-8" />
                    </a>
                </div>

            </div>
            <div className="right-4 absolute">
                <div className="text-sm">&copy; {new Date().getFullYear()} Developed by  <a target="_blank" href="https://frontnback.io/" className="hover:underline">Front & Back</a></div>
            </div>
        </footer>
    );
};

export default Footer;
