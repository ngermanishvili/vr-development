'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/landing/Header/Header'

const BuildingPage = () => {
    const [blocks, setBlocks] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchBlocks()
    }, [])

    const fetchBlocks = async () => {
        try {
            const response = await fetch('/api/blocks')
            const data = await response.json()
            if (data.success) {
                setBlocks(data.data)
            }
        } catch (error) {
            console.error('Error fetching blocks:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleBlockClick = (blockCode) => {
        router.push(`/choose-apartment?block=${blockCode}`)
    }

    return (
        <div className="relative">
            <Header />
            <div className="pt-24 relative w-full h-screen">
                {/* Full screen background image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/renders/mainrender.jpg)' }}
                >
                    {/* Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>

                {/* Blocks overlay */}
                <div className="relative z-10 h-full flex items-center justify-center">
                    {loading ? (
                        <div className="text-white text-xl">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
                            {blocks.map((block) => (
                                <div
                                    key={block.id}
                                    onClick={() => handleBlockClick(block.block_code)}
                                    className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 rounded-lg p-6 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            Block {block.block_code}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {block.available_apartments} available
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {block.total_apartments} total apartments
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BuildingPage