"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const ProjectsAbout = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const projects = [
        {
            id: 0,
            title: "VR Shekvetili Forest Beach",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
            image: "/landing/hero/landing_banner.png"
        },
        {
            id: 1,
            title: "VR Krtsanisi Resort Residence",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
            image: "/landing/hero/landing_banner.png"
        },
        {
            id: 2,
            title: "VR Vake Sky Tower",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
            image: "/landing/hero/landing_banner.png"
        },
        {
            id: 3,
            title: "VR Vake Sky Tower",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
            image: "/landing/hero/landing_banner.png"
        },
        {
            id: 4,
            title: "VR Vake Sky Tower",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
            image: "/landing/hero/landing_banner.png"
        },

    ]

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    }

    return (
        <section className="py-20 px-6">
            <div className="max-w-full mx-auto">
                <h2 className="text-3xl font-light text-center mb-8 text-yellow-600 tracking-wider" style={{ fontFamily: 'Baskerville Display PT, serif', fontWeight: 'bold' }}>COMPLETED PROJECTS</h2>
                <h2 className="text-1xl font-light text-center mb-8 text-black tracking-wider" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>OUR JOURNEY</h2>

                {/* Desktop View */}
                <div className="hidden md:flex gap-2 h-[500px] overflow-hidden relative">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${index === activeIndex ? 'flex-[0.6]' : 'flex-[0.2]'
                                }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>

                            {index === activeIndex ? (
                                <>
                                    {/* Left side text for active project, centered vertically */}
                                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white">
                                        <h2 className="font-bold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
                                            1998
                                        </h2>
                                        <p className="text-sm text-white max-w-xs leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                    <div className="absolute bottom-6 right-6">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleNext()
                                            }}
                                            className="w-10 h-10 rounded-full border border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-all"
                                        >
                                            +
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Title for inactive projects */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Baskerville Display PT, serif', fontWeight: 'bold' }}>1998</h3>
                                    </div>
                                    <div className="absolute bottom-6 right-6">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setActiveIndex(index)
                                            }}
                                            className="w-10 h-10 rounded-full border border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-all"
                                        >
                                            -
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="md:hidden overflow-x-scroll"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                    <div className="flex gap-4 pb-4 w-max">
                        {projects.map((project, index) => (
                            <div key={project.id} className="relative flex-shrink-0 w-80 h-96 overflow-hidden rounded-lg">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
                                
                                {/* Center Text for each mobile project */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <h2 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                                        1998
                                    </h2>
                                    <p className="text-xs text-white max-w-xs text-center leading-relaxed px-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectsAbout