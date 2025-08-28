"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('ENG');
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '/projects';

    useEffect(() => {
        if (open) document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, [open]);

    // Auto-scroll effect
    useEffect(() => {
        if (!open || isHovered || !scrollRef.current) return;

        const scrollContainer = scrollRef.current;
        let scrollAmount = 0;

        const interval = setInterval(() => {
            scrollAmount += 0.1;  // Very slow scroll speed
            scrollContainer.scrollTop = scrollAmount;

            // Reset when reaching bottom
            if (scrollAmount >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
                scrollAmount = 0;
            }
        }, 16);

        return () => clearInterval(interval);
    }, [open, isHovered]);

    const images = [
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
        { src: "/shekvetili/big-banner.webp", label: "VR KRTSANISI" },
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
        { src: "/shekvetili/big-banner.webp", label: "VR KRTSANISI" },
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
        { src: "/shekvetili/big-banner.webp", label: "VR KRTSANISI" },
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
        { src: "/shekvetili/big-banner.webp", label: "VR KRTSANISI" },
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
        { src: "/shekvetili/big-banner.webp", label: "VR KRTSANISI" },
        { src: "/shekvetili/big-banner.webp", label: "VR SHEKVETILI" },
    ];

    return (
        <>
            {/* Trigger Button - Higher z-index to stay above chat */}
            <button
                aria-label="Open menu"
                className="relative z-[200] inline-flex items-center justify-center hover:opacity-80 transition cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <svg
                    className="w-8 h-8"
                    viewBox="0 0 317.2 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        className={isHomePage ? "fill-white" : "fill-[#BE9744]"}
                        width="317.2"
                        height="20.43"
                    />
                    <rect
                        className={isHomePage ? "fill-white" : "fill-[#BE9744]"}
                        y="39.78"
                        width="317.2"
                        height="20.43"
                    />
                    <rect
                        className={isHomePage ? "fill-white" : "fill-[#BE9744]"}
                        y="79.57"
                        width="317.2"
                        height="20.43"
                    />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white/95 backdrop-blur-[1px] z-[300]"
                    >
                        {/* Close button - Always visible */}
                        <button
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                            className="fixed top-6 right-6 z-[500] p-3 rounded-full transition border cursor-pointer hover:bg-gray-100"
                        >
                            <X className="h-6 w-6 text-black" />
                        </button>

                        {/* Slide-in panel */}
                        <motion.div
                            key="panel"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex"
                        >
                            {/* LEFT: Auto-scrolling image columns */}
                            <div
                                className="hidden md:block md:w-[25%] lg:w-[35%] xl:w-[35%] h-full border-r border-black/10 overflow-hidden"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div
                                    ref={scrollRef}
                                    className="h-full overflow-y-auto scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    <div className="p-6">
                                        {/* Two column grid for images */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-4">
                                                {images.slice(0, Math.ceil(images.length / 2)).map((img, idx) => (
                                                    <ImageTile
                                                        key={idx}
                                                        src={img.src}
                                                        label={img.label}
                                                        height={idx % 2 === 0 ? 400 : 400}
                                                    />
                                                ))}
                                            </div>
                                            <div className="space-y-4 pt-12">
                                                {images.slice(Math.ceil(images.length / 2)).map((img, idx) => (
                                                    <ImageTile
                                                        key={idx}
                                                        src={img.src}
                                                        label={img.label}
                                                        height={idx % 2 === 0 ? 400 : 400}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {/* Duplicate for infinite scroll effect */}
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="space-y-4">
                                                {images.slice(0, Math.ceil(images.length / 2)).map((img, idx) => (
                                                    <ImageTile
                                                        key={`dup-${idx}`}
                                                        src={img.src}
                                                        label={img.label}
                                                        height={idx % 2 === 0 ? 400 : 400}
                                                    />
                                                ))}
                                            </div>
                                            <div className="space-y-4 pt-12">
                                                {images.slice(Math.ceil(images.length / 2)).map((img, idx) => (
                                                    <ImageTile
                                                        key={`dup2-${idx}`}
                                                        src={img.src}
                                                        label={img.label}
                                                        height={idx % 2 === 0 ? 400 : 400}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: menu column */}
                            <div className="flex-1 bg-white relative h-full overflow-y-auto">
                                {/* Big menu list */}
                                <nav className="min-h-full flex flex-col">
                                    <ul className="mt-20 select-none">
                                        {[
                                            { label: "HOME", highlight: true, href: "/" },
                                            { label: "ABOUT US", href: "/about" },
                                            { label: "PROJECTS", href: "/projects" },
                                            { label: "RENT", href: "/" },
                                            { label: "OFFERS", href: "/" },
                                            { label: "CONTACT", href: "/" },
                                        ].map((item) => (
                                            <li key={item.label} className="">
                                                <Link
                                                    href={item.href}
                                                    className={
                                                        "block pl-6 pr-12 md:pl-10 md:pr-16 lg:pl-16 lg:pr-20 py-2 md:py-3 lg:py-3.5 text-lg md:text-xl lg:text-2xl tracking-[0.08em] uppercase border-t border-black/10 font-serif transition text-right " +
                                                        (item.highlight ? "text-[#B48B3E] hover:text-[#B48B3E]" : "text-black hover:text-[#B48B3E]")
                                                    }
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                        {/* bottom hairline */}
                                        <li className="border-t border-black/10" />
                                    </ul>

                                    {/* Bottom links row - aligned to right */}
                                    <div className="mt-6 lg:mt-8 pr-12 md:pr-16 lg:pr-20 pl-6 md:pl-10 lg:pl-16">
                                        <div className="flex flex-wrap justify-end gap-4 md:gap-6 lg:gap-8 text-[10px] md:text-[11px] lg:text-xs tracking-wider uppercase text-black/70">
                                            {[
                                                "Choose an apartment",
                                                "News",
                                                "Partners",
                                                "Investment",
                                            ].map((l) => (
                                                <Link
                                                    key={l}
                                                    href="/"
                                                    className="hover:text-[#B48B3E] transition"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {l}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Language switch below Investment */}
                                    <div className="mt-6 pr-12 md:pr-16 lg:pr-20 pl-6 md:pl-10 lg:pl-16">
                                        <div className="flex justify-end">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setLangOpen(!langOpen)}
                                                    className="inline-flex items-center gap-2 text-lg md:text-md lg:text-md font-bold tracking-wider uppercase text-black hover:text-[#B48B3E] transition cursor-pointer"
                                                >
                                                    <span className="inline-block">▾</span>
                                                    <span>{selectedLang}</span>
                                                </button>

                                                {langOpen && (
                                                    <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                                                        {['ENG', 'RU', 'GE'].map((lang) => (
                                                            <button
                                                                key={lang}
                                                                onClick={() => {
                                                                    setSelectedLang(lang);
                                                                    setLangOpen(false);
                                                                }}
                                                                className={`block w-full px-4 py-2 text-left text-md font-bold uppercase tracking-wider hover:bg-gray-50 transition cursor-pointer ${selectedLang === lang ? 'text-[#B48B3E]' : 'text-black'
                                                                    }`}
                                                            >
                                                                {lang}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer pushes content up */}
                                    <div className="flex-1 min-h-[50px]" />
                                </nav>
                            </div>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    );
}

function ImageTile({ src, label, height = 250 }) {
    return (
        <div
            className="relative overflow-hidden rounded-lg bg-black/5"
            style={{ height: `${height}px` }}
        >
            <Image
                src={src}
                alt={label || ""}
                fill
                className="object-cover object-center hover:scale-110 transition-transform duration-500"
                sizes="(min-width: 768px) 25vw, 50vw"
            />
            {/* Dark overlay for text readability */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            {label && (
                <div className="absolute left-3 bottom-3">
                    <span className="text-white font-serif italic tracking-wider text-xs md:text-sm select-none drop-shadow-lg">
                        {label}
                    </span>
                </div>
            )}
        </div>
    );
}