"use client"
import React, { useState } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const headerColor = isHomePage ? 'text-white' : 'text-[#BE9744]';
    const hoverColor = isHomePage ? 'hover:text-yellow-300' : 'hover:text-[#BE9744]/80';
    const bgHover = isHomePage ? 'hover:bg-white/10' : 'hover:bg-[#BE9744]/10';

    return (
        <>
            <nav className={`absolute top-0 left-0 right-0 z-50 px-6 py-4 ${headerColor}`}>
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-3 items-center">
                    <div className="flex items-center space-x-6">
                        <button className={`border ${isHomePage ? 'border-white/30' : 'border-[#BE9744]'} px-4 py-2 text-sm ${bgHover} transition-colors`}>
                            CHOOSE AN APARTMENT
                        </button>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 font-bold" />
                            <span className="text-sm font-bold">*2999</span>
                        </div>
                        <button className={`text-sm font-bold ${hoverColor} transition-colors`}>CONTACT</button>
                        <button className={`text-sm font-bold ${hoverColor} transition-colors`}>ABOUT</button>
                    </div>

                    <div className="text-2xl font-bold tracking-wider text-center">VR</div>

                    <div className="flex items-center justify-end space-x-3">
                        <div className="flex items-center space-x-1">
                            <span className="text-sm">ENG</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
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
                    <div className={`flex flex-col items-center justify-center h-full space-y-8 ${headerColor}`}>
                        <button
                            className={`border ${isHomePage ? 'border-white/30' : 'border-[#BE9744]'} px-6 py-3 text-lg ${bgHover} transition-colors`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CHOOSE AN APARTMENT
                        </button>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-5 h-5 font-bold" />
                            <span className="text-lg font-bold">*2999</span>
                        </div>
                        <button
                            className={`text-lg font-bold ${hoverColor} transition-colors`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CONTACT
                        </button>
                        <button
                            className={`text-lg font-bold ${hoverColor} transition-colors`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ABOUT
                        </button>
                        <div className="flex items-center space-x-1">
                            <span className="text-lg">ENG</span>
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;