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
                <h2 className="text-3xl font-light text-center mb-8 text-yellow-600 tracking-wider">COMPLETED PROJECTS</h2>
                <h2 className="text-1xl font-light text-center mb-8 text-black tracking-wider">OUR JOURNEY</h2>

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
                                    <div className="absolute top-6 left-10 text-white">
                                        <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-16 text-white">
                                        <p className="text-sm opacity-90 leading-relaxed">
                                            {project.description}
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
                                <div className="absolute top-6 left-6 text-white">
                                    <h3 className="text-xl font-light mb-2">{project.title}</h3>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="text-sm opacity-90 leading-relaxed">
                                        {project.description}
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