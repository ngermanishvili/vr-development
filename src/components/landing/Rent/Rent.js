import React from 'react'
import Image from 'next/image'

const Rent = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className=" mx-auto">
                <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider">RENT</h2>

                {/* Search Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12  mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <select className=" cursor-pointer px-8 py-3 border border-black bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent">
                            <option>Rent</option>
                            <option>Buy</option>
                            <option>Lease</option>
                        </select>
                        <select className=" cursor-pointer px-8 py-3 border border-black bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent">
                            <option>Location</option>
                            <option>Shekvetili</option>
                            <option>Batumi</option>
                            <option>Tbilisi</option>
                        </select>
                        <select className=" cursor-pointer px-8 py-3 border border-black bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent">
                            <option>Price</option>
                            <option>$1000-2000</option>
                            <option>$2000-5000</option>
                            <option>$5000+</option>
                        </select>
                    </div>
                    <button className="border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-3">SEARCH</button>
                </div>

                {/* Rental Properties */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Property 1 */}
                    <div className="group overflow-hidden cursor-pointer ">
                        <div className="relative h-64">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Modern living room rental"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-light mb-3 text-gray-800 italic">Shekvetili</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                        </div>
                    </div>

                    {/* Property 2 */}
                    <div className="group overflow-hidden cursor-pointer ">
                        <div className="relative h-64">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Minimalist white interior rental"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-light mb-3 text-gray-800 italic">Shekvetili</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                        </div>
                    </div>

                    {/* Property 3 */}
                    <div className="group overflow-hidden cursor-pointer">
                        <div className="relative h-64">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Monochrome bedroom rental"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-light mb-3 text-gray-800 italic">Shekvetili</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        variant="outline"
                        className="border-black border-1  cursor-pointer text-black  transition-all duration-300 bg-transparent px-8 py-2"
                    >
                        LOAD MORE
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Rent