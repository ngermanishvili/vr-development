"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 text-white">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-3 items-center">
                    <div className="flex items-center space-x-8">
                        <button className="border border-white/30 px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                            HOUSE DEVELOPMENT
                        </button>
                        <button className="text-sm hover:text-yellow-300 transition-colors">JOBS</button>
                        <button className="text-sm hover:text-yellow-300 transition-colors">CONTACT</button>
                    </div>

                    <div className="text-2xl font-bold tracking-wider text-center">VR</div>

                    <div className="flex items-center justify-end space-x-4">
                        <button className="text-sm hover:text-yellow-300 transition-colors">ENG</button>
                        <Menu className="w-6 h-6" />
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-wider">VR</div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/90 md:hidden">
                    <div className="flex flex-col items-center justify-center h-full space-y-8 text-white">
                        <button
                            className="border border-white/30 px-6 py-3 text-lg hover:bg-white/10 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            HOUSE DEVELOPMENT
                        </button>
                        <button
                            className="text-lg hover:text-yellow-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            JOBS
                        </button>
                        <button
                            className="text-lg hover:text-yellow-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CONTACT
                        </button>
                        <button
                            className="text-lg hover:text-yellow-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ENG
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;