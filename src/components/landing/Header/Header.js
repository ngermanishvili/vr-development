"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('ENG');
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '/projects';
    const headerColor = isHomePage ? 'text-white' : 'text-[#BE9744]';
    const hoverColor = 'hover:text-[#BE9645] cursor-pointer';
    const bgHover = 'hover:bg-[#BE9645] hover:text-white cursor-pointer';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.language-dropdown')) {
                setIsLangMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>

            <nav className={`absolute  top-0 left-0 right-0 z-50 px-6 py-4 ${headerColor}`}>
                {/* Desktop Header */}
                <div className="md:w-full [@media(min-width:2000px)]:max-w-7xl mx-auto flex flex-wrap justify-between items-start">

                    <div className="hidden md:flex justify-between items-center w-full">
                        <div className="flex items-center text-left space-x-6 ">
                            <button className={`border ${isHomePage ? 'border-white/30' : 'border-[#BE9744]'} px-2 py-2  text-sm ${bgHover} transition-colors whitespace-nowrap`}>
                                CHOOSE AN APARTMENT
                            </button>
                            <a href="tel:*2999" className="flex items-center space-x-2 hover:text-[#BE9645] cursor-pointer transition-colors">
                                <Phone className="w-4 h-4 font-bold" />
                                <span className="text-sm font-bold">*2999</span>
                            </a>

                            <button className={`text-sm font-bold ${hoverColor} transition-colors`}>CONTACT</button>

                        </div>

                        <img
                            src="/logo/vr-logo.svg"
                            alt="VR Logo"
                            className="h-8 w-auto max-w-[50px]  mx-auto"
                            style={{
                                filter: isHomePage ? 'none' : 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
                            }}
                        />

                        <div className="flex items-center justify-end space-x-6">
                            <div className="relative language-dropdown">
                                <button
                                    className="flex items-center space-x-1 hover:text-[#BE9645] cursor-pointer transition-colors"
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                >
                                    <span className="text-sm">{selectedLang}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {isLangMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                        {['ENG', 'GEO', 'RU'].map((lang) => (
                                            <button
                                                key={lang}
                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#BE9645] hover:text-white transition-colors text-left"
                                                onClick={() => {
                                                    setSelectedLang(lang);
                                                    setIsLangMenuOpen(false);
                                                }}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <svg
                                className="w-8 h-8 cursor-pointer"
                                viewBox="0 0 317.2 100"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    className={isHomePage ? 'fill-white' : 'fill-[#BE9744]'}
                                    width="317.2"
                                    height="20.43"
                                />
                                <rect
                                    className={isHomePage ? 'fill-white' : 'fill-[#BE9744]'}
                                    y="39.78"
                                    width="317.2"
                                    height="20.43"
                                />
                                <rect
                                    className={isHomePage ? 'fill-white' : 'fill-[#BE9744]'}
                                    y="79.57"
                                    width="317.2"
                                    height="20.43"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-wider">VR</div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> :
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 317.2 100"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    className={isHomePage ? 'fill-white' : 'fill-[#BE9744]'}
                                    width="317.2"
                                    height="20.43"
                                />
                                <rect
                                    className={isHomePage ? 'fill-white' : 'fill-[#BE9744]'}
                                    y="39.78"
                                    width="317.2"
                                    height="20.43"
                                />
                                <rect
                                    className={isHomePage ? 'fill-white' : 'fill-[#BE9744]'}
                                    y="79.57"
                                    width="317.2"
                                    height="20.43"
                                />
                            </svg>
                        }
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/90 md:hidden">
                    <div className={`flex flex-col items-center justify-center h-full space-y-8 ${headerColor}`}>
                        <button
                            className={`border ${isHomePage ? 'border-white/30' : 'border-[#BE9744]'} px-6 py-3 text-lg ${bgHover} transition-colors whitespace-nowrap`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CHOOSE AN APARTMENT
                        </button>
                        <a href="tel:*2999" className="flex items-center space-x-2 hover:text-[#BE9645] cursor-pointer transition-colors">
                            <Phone className="w-5 h-5 font-bold" />
                            <span className="text-lg font-bold">*2999</span>
                        </a>
                        <Link href="/">
                            <button
                                className={`text-lg font-bold ${hoverColor} transition-colors`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                HOME
                            </button>
                        </Link>
                        <button
                            className={`text-lg font-bold ${hoverColor} transition-colors`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CONTACT
                        </button>
                        <Link href="/projects">
                            <button
                                className={`text-lg font-bold ${hoverColor} transition-colors`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                PROJECTS
                            </button>
                        </Link>
                        <Link href="/about">
                            <button
                                className={`text-lg font-bold ${hoverColor} transition-colors`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ABOUT
                            </button>
                        </Link>
                        <div className="relative language-dropdown">
                            <button
                                className="flex items-center space-x-1 hover:text-[#BE9645] cursor-pointer transition-colors"
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            >
                                <span className="text-lg">{selectedLang}</span>
                                <ChevronDown className="w-5 h-5" />
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    {['ENG', 'GEO', 'RU'].map((lang) => (
                                        <button
                                            key={lang}
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#BE9645] hover:text-white transition-colors text-center min-w-[60px]"
                                            onClick={() => {
                                                setSelectedLang(lang);
                                                setIsLangMenuOpen(false);
                                            }}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;