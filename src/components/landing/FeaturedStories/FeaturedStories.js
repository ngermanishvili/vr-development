"use client"
import React from 'react'
import Image from 'next/image'

const FeaturedStories = () => {
    const stories = [
        { height: 'h-72', title: 'Golf Development', category: 'DEVELOPMENT', date: '23.01.22', alt: 'Golf course development' },
        { height: 'h-94', title: 'Construction Project', category: 'DEVELOPMENT', date: '23.01.22', alt: 'Construction development' },
        { height: 'h-72', title: 'Resort Planning', category: 'DEVELOPMENT', date: '23.01.22', alt: 'Resort development' },
        { height: 'h-94', title: 'Sports Complex', category: 'DEVELOPMENT', date: '23.01.22', alt: 'Sports events' }
    ]

    const StoryCard = ({ story }) => (
        <div className="group overflow-hidden bg-white">
            <div className={`relative ${story.height}`}>
                <Image
                    src="/landing/hero/landing_banner.png"
                    alt={story.alt}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-2">
                <div className="mb-2">
                    <div className="flex items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{story.category}</span>
                        <div className="flex-1 h-px bg-gray-300 ml-2"></div>
                    </div>
                    <div className="text-right text-xs">
                        <span className="text-xs text-gray-400">{story.date}</span>
                    </div>
                </div>
                <h3 className="text-sm font-medium mb-2 text-gray-800 uppercase">{story.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.
                </p>
            </div>
        </div>
    )

    return (
        <section className="py-8 px-6">
            <div className="mx-auto">
                <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider">FEATURED STORIES</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stories.map((story, index) => (
                        <StoryCard key={index} story={story} />
                    ))}
                </div>

                <div className="text-center">
                    <button
                        style={{
                            border: '1px solid #000',
                            background: 'transparent',
                            color: '#000',
                            padding: '8px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontFamily: 'Arial, sans-serif'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#000'
                            e.target.style.color = '#fff'
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'transparent'
                            e.target.style.color = '#000'
                        }}
                    >
                        Explore More
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedStories