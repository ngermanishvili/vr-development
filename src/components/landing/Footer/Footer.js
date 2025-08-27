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
                    <a href="#" className="bg-white rounded-full p-3 text-black hover:bg-gray-300 transition">
                        <svg width="24" height="24" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M108.23,4.23c21.33-2.43,24.01,29.75,3.29,31.37-20.55,1.61-23.09-29.12-3.29-31.37ZM107.45,11.85h-5.64l6.69,8.8-6.21,7.52c.79-.09,1.91.21,2.64-.12,1.15-.52,4.2-5.4,5.16-5.4l4.32,5.52h5.4l-6.92-9.28,5.72-7.04c-.79.09-1.92-.21-2.64.12-.95.43-3.93,5.1-4.68,4.92l-3.85-5.04Z" transform="scale(0.18) translate(-90, 0)" fill="currentColor" />
                        </svg>
                    </a>
                    <a href="#" className="bg-white rounded-full p-3 text-black hover:bg-gray-300 transition">
                        <svg width="24" height="24" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.32,4.24c21.35-2.2,23.59,29.71,3.29,31.37C-1.2,37.3-3.62,6.29,16.32,4.24ZM24.05,8.49c-2.64-.55-5.88-.53-7.54,1.94-1.3,1.93-.64,4.08-.96,6.24l-3.5.22v4.08h3.6v10.56h4.32v-10.56l3.38-.1.71-3.85c-1.37-.47-2.68-.15-4.08-.12v-3.72c0-1.28,3.2-1.13,4.08-1.08v-3.6Z" transform="scale(0.18) translate(10, 0)" fill="currentColor" />
                        </svg>
                    </a>
                    <a href="#" className="bg-white rounded-full p-3 text-black hover:bg-gray-300 transition">
                        <svg width="24" height="24" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.15,4.23c21.37-2.43,24,29.57,3.53,31.37-20.66,1.81-23.36-29.11-3.53-31.37ZM59.03,10.7c-2.07.33-3.87,2.13-4.2,4.2s-.27,7.66-.06,9.78c.33,3.31,2.81,4.66,5.88,4.92,2.7.23,9.08.38,11.14-1.34,2.41-2.01,2.17-8.5,1.94-11.5s-1.38-5.67-4.7-6.1c-1.95-.25-8.1-.26-10,.04Z" transform="scale(0.18) translate(-50, 0)" fill="currentColor" />
                            <path d="M59.51,12.39c1.87-.27,7.4-.3,9.28-.04,2.79.38,3.1,2.8,3.26,5.14.1,1.48.11,3.57.01,5.05-.13,2.07-.29,4.41-2.63,5.05-1.97.54-9.11.6-10.96-.12-1.13-.44-1.89-1.86-2.02-3.02-.22-2-.21-6.86.03-8.85.22-1.86,1.17-2.93,3.04-3.2ZM70.07,15.87c1.08-1.09-.76-2.73-1.62-1.75-1.05,1.2.68,2.7,1.62,1.75ZM63.1,15.26c-5.53.96-4.8,9.94,1.32,9.72,6.53-.24,5.86-10.96-1.32-9.72Z" transform="scale(0.18) translate(-50, 0)" fill="currentColor" />
                            <path d="M66.45,22.32c-2.94,2.94-7.6-1.67-4.49-4.61s7.29,1.81,4.49,4.61Z" transform="scale(0.18) translate(-50, 0)" fill="currentColor" />
                        </svg>
                    </a>
                    <a href="#" className="bg-white rounded-full p-3 text-black hover:bg-gray-300 transition">
                        <svg width="24" height="24" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M154.31,4.23c13.92-1.58,23.11,14.62,14.21,25.49-7.59,9.27-22.31,7.29-26.84-3.87-3.88-9.55,2.37-20.45,12.63-21.62ZM149.27,13.11c-1.31.19-2.01.58-2.46,1.86-.59,1.68-.59,8.16,0,9.83.49,1.4,1.72,1.78,3.12,1.92,3.09.31,9.36.28,12.49.01,1.03-.09,2.06-.27,2.75-1.09,1.11-1.31,1.09-6.14.97-7.93-.2-2.84-.58-4.41-3.72-4.68s-10.27-.35-13.15.07Z" transform="scale(0.18) translate(-140, 0)" fill="currentColor" />
                            <path d="M154.13,17.13c.38-.39,4.46,2.24,5.28,2.4l-.55.52-4.73,2.35v-5.28Z" transform="scale(0.18) translate(-140, 0)" fill="currentColor" />
                        </svg>
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
