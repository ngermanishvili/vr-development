import React from 'react'
import Image from 'next/image'
import Header from '@/components/landing/Header/Header'
import BackButton from '@/components/ui/BackButton'

// Mock data for stories - you can later move this to a database or API
const storiesData = {
    'golf-development': {
        title: 'Golf Development',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.',
        seo: {
            title: 'Golf Development Project - VR Holding Featured Story',
            description: 'Discover VR Holding\'s golf development project - creating world-class golf facilities as part of our luxury resort developments in Georgia.',
            keywords: 'VR Holding golf, golf development Georgia, luxury golf resort, VR golf project'
        }
    },
    'construction-project': {
        title: 'Construction Project',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.',
        seo: {
            title: 'Construction Project Excellence - VR Holding Featured Story',
            description: 'Learn about VR Holding\'s construction excellence and commitment to quality in every real estate development project across Georgia.',
            keywords: 'VR Holding construction, construction excellence Georgia, quality construction, premium building'
        }
    },
    'resort-planning': {
        title: 'Resort Planning',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.',
        seo: {
            title: 'Resort Planning & Development - VR Holding Featured Story',
            description: 'Explore VR Holding\'s comprehensive resort planning process for luxury developments like VR Shekvetili Forest Beach resort.',
            keywords: 'VR Holding resort planning, luxury resort development, Shekvetili resort, resort design Georgia'
        }
    },
    'sports-complex': {
        title: 'Sports Complex',
        category: 'DEVELOPMENT',
        date: '23.01.22',
        image: '/landing/hero/landing_banner.png',
        description: 'The most important thing for us is the welfare of our customers. offers, thus making our relations more interesting.',
        seo: {
            title: 'Sports Complex Development - VR Holding Featured Story',
            description: 'Discover VR Holding\'s sports complex developments, creating world-class recreational facilities for luxury residential communities.',
            keywords: 'VR Holding sports complex, recreational facilities Georgia, luxury amenities, sports development'
        }
    }
}

export function generateMetadata({ params }) {
    const story = storiesData[params.slug];

    if (!story) {
        return {
            title: 'Story Not Found - VR Holding',
            description: 'The requested story could not be found.',
        };
    }

    return {
        title: story.seo.title,
        description: story.seo.description,
        keywords: story.seo.keywords,
        openGraph: {
            title: story.seo.title,
            description: story.seo.description,
            images: [
                {
                    url: story.image,
                    width: 1200,
                    height: 630,
                    alt: story.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: story.seo.title,
            description: story.seo.description,
            images: [story.image],
        },
    };
}

export default function FeaturedStoryPage({ params }) {
    const story = storiesData[params.slug]

    if (!story) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="pt-24 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-light text-[#ca9b43] mb-4" style={{ fontFamily: 'Baskerville, serif' }}>Story Not Found</h1>
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
                        className="text-4xl font-medium mb-6 text-[#ca9b43] uppercase"
                        style={{ fontFamily: 'Baskerville, serif' }}
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
                        <BackButton />
                    </div>
                </div>
            </main>
        </div>
    )
}