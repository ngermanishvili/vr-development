"use client"
import React, { use } from 'react'
import Image from 'next/image'
import Header from '@/components/landing/Header/Header'

// Mock data for stories - you can later move this to a database or API
const storiesData = {
    'golf-development': {
        title: 'Golf Development',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.'
    },
    'construction-project': {
        title: 'Construction Project',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.'
    },
    'resort-planning': {
        title: 'Resort Planning',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.'
    },
    'sports-complex': {
        title: 'Sports Complex',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.'
    }
}

export default function FeaturedStoryPage({ params }) {
    const resolvedParams = use(params)
    const story = storiesData[resolvedParams.slug]

    if (!story) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="pt-24 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-light text-gray-800 mb-4">Story Not Found</h1>
                        <p className="text-gray-600">The requested story could not be found.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Story Content */}
            <main className="pt-24 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Story Image */}
                    <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg">
                        <Image
                            src={story.image}
                            alt={story.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Story Meta Info */}
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <span 
                                className="text-xs text-gray-500 uppercase tracking-wider" 
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                                {story.category}
                            </span>
                            <div className="flex-1 h-px bg-gray-300 ml-4"></div>
                        </div>
                        <div className="text-right mb-4">
                            <span 
                                className="text-xs text-gray-400" 
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                                {story.date}
                            </span>
                        </div>
                    </div>

                    {/* Story Title */}
                    <h1 
                        className="text-4xl font-medium mb-6 text-gray-800 uppercase"
                        style={{ fontFamily: 'Baskerville Display PT, serif' }}
                    >
                        {story.title}
                    </h1>

                    {/* Story Description */}
                    <div className="prose max-w-none">
                        <p 
                            className="text-lg text-gray-600 leading-relaxed mb-8"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            {story.description}
                        </p>
                    </div>

                    {/* Back Button */}
                    <div className="mt-12 mb-8">
                        <button
                            onClick={() => window.history.back()}
                            className="border border-black px-6 py-3 hover:bg-[#BE9645] hover:text-white hover:border-[#BE9645] transition-all duration-300"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            ← Back to Stories
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}