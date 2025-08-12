"use client"
import React, { useState, useEffect } from 'react'

const LandingAccordion = () => {
    const [activeItem, setActiveItem] = useState(null) // No default open
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggleItem = (itemId) => {
        setActiveItem(activeItem === itemId ? null : itemId)
    }

    const accordionItems = [
        { id: 1, number: "01", title: "Multifunctional Centre", content: "A comprehensive multifunctional centre offering various amenities and services for residents and visitors." },
        { id: 2, number: "02", title: "Cafe-Restaurants", content: "Premium dining experiences with world-class restaurants and cozy cafes offering exceptional cuisine." },
        { id: 3, number: "03", title: "An Infinity Pool With Magical Sea Views", content: "The complex includes an 80-meter infinity pool with panoramic views, which adds more charm to the project." }
    ]

    const AccordionItem = ({ item }) => {
        const isOpen = activeItem === item.id

        return (
            <div className="border-b border-black cursor-pointer">
                <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center py-6 pl-4 md:pl-6 text-left hover:bg-gray-50 transition-all duration-500 ease-in-out group cursor-pointer"
                >
                    <span
                        className="font-light  italic w-12 md:w-16 flex-shrink-0 md:mt-4 mt-2"
                        style={{ fontSize: isMobile ? '16px' : '24px' }}
                    >
                        {item.number}
                    </span>
                    <div className="flex-1 relative md:mb-5 mb-2">
                        <span
                            className="font-light italic  text-black group-hover:text-yellow-600 transition-colors duration-500 ease-in-out absolute left-[30%] md:left-[60%]"
                            style={{ fontSize: isMobile ? '14px' : '20px' }}
                        >
                            {item.title}
                        </span>
                    </div>
                </button>

                <div
                    className="overflow-hidden transition-all duration-800"
                    style={{
                        maxHeight: isOpen ? '500px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        paddingBottom: isOpen ? (isMobile ? '64px' : '48px') : '0px',
                        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                >
                    <div className="pt-4 pl-4 md:pl-6">
                        <div className="flex">
                            <span className="w-12 md:w-16 flex-shrink-0"></span>
                            <div className="flex-1">
                                <p
                                    className="text-gray-600 leading-relaxed ml-[30%] md:ml-[60%] max-w-[65%] md:max-w-[35%] transition-opacity duration-600 ease-in-out"
                                    style={{ fontSize: isMobile ? '13px' : '18px' }}
                                >
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="py-8 bg-white">
            <div className="w-full">
                <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider">OPPORTUNITIES</h2>

                <div className="w-full border-t border-black">
                    {accordionItems.map((item) => (
                        <AccordionItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LandingAccordion