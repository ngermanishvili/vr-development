"use client"
import React, { useState } from 'react'

const LandingAccordion = () => {
    const [activeItem, setActiveItem] = useState(3)

    const toggleItem = (itemId) => {
        setActiveItem(activeItem === itemId ? null : itemId)
    }

    const accordionItems = [
        {
            id: 1,
            number: "01",
            title: "Multifunctional Centre",
            content: "A comprehensive multifunctional centre offering various a    multifunctional centre offering various a multifunctional centre offering various a multifunctional centre offering various amenities and services for residents and visitors."
        },
        {
            id: 2,
            number: "02",
            title: "Cafe-Restaurants",
            content: "Premium dining experiences with world-class restaurants  multifunctional centre offering various  a  multifunctional centre offering various a and cozy cafes offering exceptional cuisine."
        },
        {
            id: 3,
            number: "03",
            title: "An Infinity Pool With Magical Sea Views",
            content: "The complex includes an multifunctional centre offering various a  multifunctional centre offering various a  multifuncti multifunctional centre offering various a onal centre offering various a 80-meter infinity pool with panoramic views, which adds more charm to the project"
        }
    ]

    return (
        <section className="py-8 bg-white">
            <div className="w-full px-6">
                <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider">OPPORTUNITIES</h2>

                <div className="w-full max-w-none ">
                    {accordionItems.map((item) => (
                        <div key={item.id} className="border-b border-black">
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full flex items-center py-6 pl-4 md:pl-6 text-left hover:bg-gray-50 transition-all duration-300 group"
                            >
                                <span className="text-xl md:text-2xl font-light text-gray-400 italic w-12 md:w-16 flex-shrink-0">{item.number}</span>
                                <div className="flex-1 relative">
                                    <span className="text-lg md:text-xl font-light italic text-black group-hover:text-yellow-600 transition-colors absolute left-[30%] md:left-[60%]">
                                        {item.title}
                                    </span>
                                </div>

                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeItem === item.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pt-4 pb-16 md:pb-12 pl-4 md:pl-6">
                                    <div className="flex">
                                        <span className="w-12 md:w-16 flex-shrink-0"></span>
                                        <div className="flex-1">
                                            <p className="text-gray-600 leading-relaxed text-sm md:text-lg ml-[30%] md:ml-[60%] max-w-[65%] md:max-w-[35%]">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LandingAccordion