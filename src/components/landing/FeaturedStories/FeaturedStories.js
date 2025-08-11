import React from 'react'
import Image from 'next/image'

const FeaturedStories = () => {
    return (
        <section className="py-20 px-6">
            <div className=" mx-auto">
                <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider">FEATURED STORIES</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Story 1 - Small */}
                    <div className="group overflow-hidden bg-white">
                        <div className="relative h-72">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Golf course development"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-2">
                            <div className="mb-2">
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">DEVELOPMENT</span>
                                    <div className="flex-1 h-px bg-gray-300 ml-2"></div>
                                </div>
                                <div className="text-right text-xs ">
                                    <span className="text-xs text-gray-400">23.01.22</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-medium mb-2 text-gray-800 uppercase">SPORTS EVENTS</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.
                            </p>
                        </div>
                    </div>

                    {/* Story 2 - Large */}
                    <div className="group overflow-hidden bg-white">
                        <div className="relative h-94">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Construction development"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-2">
                            <div className="mb-2">
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">DEVELOPMENT</span>
                                    <div className="flex-1 h-px bg-gray-300 ml-2"></div>
                                </div>
                                <div className="text-right  text-xs">
                                    <span className="text-xs text-gray-400">23.01.22</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-medium mb-2 text-gray-800 uppercase">SPORTS EVENTS</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.
                            </p>
                        </div>
                    </div>

                    {/* Story 3 - Small */}
                    <div className="group overflow-hidden bg-white">
                        <div className="relative h-72">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Corporate golf events"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-2">
                            <div className="mb-2">
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">CORPORATE NEWS</span>
                                    <div className="flex-1 h-px bg-gray-300 ml-2"></div>
                                </div>
                                <div className="text-right text-xs">
                                    <span className="text-xs text-gray-400">23.01.22</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-medium mb-2 text-gray-800 uppercase">SPORTS EVENTS</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.
                            </p>
                        </div>
                    </div>

                    {/* Story 4 - Large */}
                    <div className="group overflow-hidden bg-white">
                        <div className="relative h-94">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Sports events"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-2">
                            <div className="mb-2">
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">DEVELOPMENT</span>
                                    <div className="flex-1 h-px bg-gray-300 ml-2"></div>
                                </div>
                                <div className="text-right text-xs">
                                    <span className="text-xs text-gray-400">23.01.22</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-medium mb-2 text-gray-800 uppercase">SPORTS EVENTS</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        variant="outline"
                        className="border-black border-1  cursor-pointer text-black  transition-all duration-300 bg-transparent px-8 py-2"
                    >
                        Explore More
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedStories