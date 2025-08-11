import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-600 px-5 py-4 flex justify-between items-center text-white">
            <div className="flex gap-8 items-center">
                <button className="border border-white bg-transparent text-white px-4 py-2 hover:bg-white hover:text-gray-600 transition-colors">
                    CHOOSE AN APARTMENT
                </button>
                <span className="text-white">*2999</span>
                <span className="text-white">CONTACT</span>
            </div>

            <div className="text-2xl font-bold tracking-wider">
                VR
            </div>

            <div className="flex gap-5 items-center">
                <span>ENG</span>
                <div className="flex flex-col gap-0.5">
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;