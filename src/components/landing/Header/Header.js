"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import BurgerMenu from '@/components/ui/BurgerMenu';

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

                    <div className="hidden md:flex items-center w-full relative">
                        <div className="flex items-center text-left space-x-6 flex-1">
                            <Link href="/">
                                <button className={`border ${isHomePage ? 'border-white/30' : 'border-[#BE9744]'} px-2 py-2  text-sm ${bgHover} transition-colors whitespace-nowrap`}>
                                    CHOOSE AN APARTMENT
                                </button>
                            </Link>
                            <a href="tel:*2999" className="flex items-center space-x-2 hover:text-[#BE9645] cursor-pointer transition-colors">
                                <Phone className="w-4 h-4 font-bold" />
                                <span className="text-sm font-bold">*2999</span>
                            </a>

                            <Link href="/">
                                <button className={`text-sm font-bold ${hoverColor} transition-colors`}>CONTACT</button>
                            </Link>

                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-8">
                            <Link href="/">
                                <img
                                    src="/logo/vr-logo.svg"
                                    alt="VR Logo"
                                    className="h-18 w-auto max-w-[105px] cursor-pointer"
                                    style={{
                                        filter: isHomePage ? 'none' : 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
                                    }}
                                />
                            </Link>
                        </div>

                        <div className="flex items-center justify-end space-x-6 flex-1">
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
                            <BurgerMenu />
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-wider">VR</Link>
                    <BurgerMenu />
                </div>
            </nav>
        </>
    );
};

export default Header;