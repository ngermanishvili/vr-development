'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Sidebar({ isCollapsed, isMobile, onToggleSidebar }) {
    const [blocks, setBlocks] = useState([])
    const [statistics, setStatistics] = useState(null)
    const [filters, setFilters] = useState({
        selectedBlock: '',
        apartmentType: 'ALL',
        minArea: 25.90,
        maxArea: 440.10,
        floor: 'ALL'
    })
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    useEffect(() => {
        fetchData()
        // Set initial block from URL
        const blockFromUrl = searchParams.get('block')
        if (blockFromUrl) {
            setFilters(prev => ({ ...prev, selectedBlock: blockFromUrl }))
        }
    }, [searchParams])

    const fetchData = async () => {
        try {
            // Fetch blocks
            const blocksResponse = await fetch('/api/blocks')
            const blocksData = await blocksResponse.json()
            if (blocksData.success) {
                setBlocks(blocksData.data)
            }

            // Fetch statistics
            const statsResponse = await fetch('/api/statistics')
            const statsData = await statsResponse.json()
            if (statsData.success) {
                setStatistics(statsData.data)
            }
        } catch (error) {
            console.error('Error fetching sidebar data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }))
        console.log(`Filter changed: ${filterType} = ${value}`)
        // TODO: Apply filters to apartment search
    }

    const handleChooseApartment = () => {
        // Build query string with current filters
        const queryParams = new URLSearchParams()

        if (filters.selectedBlock && filters.selectedBlock !== 'ALL') {
            queryParams.append('block', filters.selectedBlock)
        }
        if (filters.apartmentType && filters.apartmentType !== 'ALL') {
            queryParams.append('apartmentType', filters.apartmentType)
        }
        if (filters.minArea && filters.minArea !== 25.90) {
            queryParams.append('minArea', filters.minArea.toString())
        }
        if (filters.maxArea && filters.maxArea !== 440.10) {
            queryParams.append('maxArea', filters.maxArea.toString())
        }
        if (filters.floor && filters.floor !== 'ALL') {
            queryParams.append('floor', filters.floor.toString())
        }

        // Navigate to apartments page with filters
        const url = `/apartments?${queryParams.toString()}`
        console.log('Navigating to:', url)
        window.location.href = url
    }
    if (isMobile) {
        return (
            <div className="bg-white shadow p-4 font-sans">
                {/* Mobile content - always visible, no scroll */}
                <>
                    {/* Back Button */}
                    <div className="flex justify-between items-center mb-4">
                        <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f] uppercase text-xs">
                            Back
                        </button>
                        <div className="flex items-center gap-2">
                            {onToggleSidebar && (
                                <button
                                    onClick={onToggleSidebar}
                                    className="border border-gray-300 w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    title="Hide Sidebar"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            <button className="border border-gray-300 w-8 h-8 flex items-center justify-center">
                                <span className="text-lg">←</span>
                            </button>
                        </div>
                    </div>

                    {/* Building */}
                    <div className="text-center mb-4">
                        <h2 className="font-semibold italic text-base mb-2">Building</h2>
                        <div className="flex justify-center gap-2 flex-wrap">
                            {loading ? (
                                <div className="text-sm">Loading...</div>
                            ) : (
                                blocks.map((block) => (
                                    <button
                                        key={block.id}
                                        onClick={() => handleFilterChange('selectedBlock', block.block_code)}
                                        className={`px-3 py-1 text-sm ${filters.selectedBlock === block.block_code
                                            ? 'bg-gray-700 text-white'
                                            : 'border border-gray-400'
                                            }`}
                                    >
                                        {block.block_code}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">APARTMENT</button>
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">COMMERCIAL</button>
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">PARKING</button>
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">RENT</button>
                    </div>

                    {/* Number of Rooms */}
                    <div className="text-center mb-4">
                        <h2 className="text-[#cfa84f] italic font-semibold mb-2 text-sm">Number Of Rooms</h2>
                        <div className="flex justify-center gap-1 flex-wrap">
                            <button
                                onClick={() => handleFilterChange('apartmentType', 'ALL')}
                                className={`px-3 py-1 text-xs ${filters.apartmentType === 'ALL'
                                    ? 'bg-[#cfa84f] text-white'
                                    : 'border border-gray-400'
                                    }`}
                            >
                                ALL
                            </button>
                            {statistics?.byType?.map((type) => (
                                <button
                                    key={type.apartment_type}
                                    onClick={() => handleFilterChange('apartmentType', type.apartment_type)}
                                    className={`px-2 py-1 text-xs ${filters.apartmentType === type.apartment_type
                                        ? 'bg-[#cfa84f] text-white'
                                        : 'border border-gray-400'
                                        }`}
                                >
                                    {type.apartment_type === 'სტუდიო' ? 'STUDIO' :
                                        type.apartment_type === '1 საძინ' ? '1' :
                                            type.apartment_type === '2 საძინ' ? '2' :
                                                type.apartment_type === '5 საძინ' ? '5' : type.apartment_type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Total Area */}
                    <div className="text-center mb-4">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Total Area</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>From {statistics?.overall?.min_area || 25.90} m²</span>
                            <span>To {statistics?.overall?.max_area || 440.10} m²</span>
                        </div>
                        <input
                            type="range"
                            className="w-full accent-[#cfa84f]"
                            min={statistics?.overall?.min_area || 25.90}
                            max={statistics?.overall?.max_area || 440.10}
                            value={filters.maxArea}
                            onChange={(e) => handleFilterChange('maxArea', parseFloat(e.target.value))}
                        />
                        <div className="text-xs text-gray-600 mt-1">Current: {filters.maxArea} m²</div>
                        <button className="mt-2 border border-gray-400 px-3 py-1 text-xs opacity-50">Exact Number</button>
                    </div>

                    {/* Price - Disabled for now */}
                    <div className="text-center mb-4 opacity-50">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Price</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>Coming Soon</span>
                            <span>Coming Soon</span>
                        </div>
                        <input type="range" className="w-full accent-[#cfa84f]" disabled />
                        <button className="mt-2 border border-gray-400 px-3 py-1 text-xs" disabled>Exact Price</button>
                    </div>

                    {/* Floor */}
                    <div className="text-center mb-4">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Floor</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>From 1</span>
                            <span>To {blocks.find(b => b.block_code === filters.selectedBlock)?.total_floors || 12}</span>
                        </div>
                        <input
                            type="range"
                            className="w-full accent-[#cfa84f]"
                            min="1"
                            max={blocks.find(b => b.block_code === filters.selectedBlock)?.total_floors || 12}
                            onChange={(e) => handleFilterChange('floor', parseInt(e.target.value))}
                        />
                        <div className="text-xs text-gray-600 mt-1">
                            {filters.floor === 'ALL' ? 'All Floors' : `Floor ${filters.floor}`}
                        </div>
                        <button className="mt-2 border border-gray-400 px-3 py-1 text-xs opacity-50">Exact Number</button>
                    </div>

                    {/* Additional Parameters - Visual only for now */}
                    <div className="text-left mb-4 opacity-60">
                        <h2 className="font-semibold mb-2 text-sm">Additional Parameters</h2>
                        <p className="text-xs">
                            Bathroom with window | Master bedroom | <span className="text-[#cfa84f]">Terrace</span>
                            <br />
                            More than 2 windows | Windows on 3 sides | Street view
                        </p>
                        <p className="text-xs text-gray-500 mt-1 italic">Coming Soon</p>
                    </div>

                    {/* Choose Apartment Button */}
                    <button
                        onClick={handleChooseApartment}
                        className="w-full bg-[#cfa84f] hover:bg-[#b8863c] text-white py-2 uppercase font-semibold text-sm transition-colors"
                    >
                        Choose an apartment
                    </button>
                </>
            </div>
        );
    }

    // Desktop version
    return (
        <div className={`${isCollapsed ? 'w-0 overflow-hidden' : 'w-full'} h-screen bg-white shadow ${isCollapsed ? 'p-0' : 'px-2 py-6'} font-sans overflow-y-auto`}>
            {/* Back Button */}
            <div className="flex justify-between items-center mb-6">
                <button className="border border-[#cfa84f] px-6 py-2 text-[#cfa84f] uppercase text-sm">
                    Back
                </button>
                {onToggleSidebar && (
                    <button
                        onClick={onToggleSidebar}
                        className="border border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg rounded"
                        title="Hide Sidebar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Building */}
            <div className="text-center mb-6">
                <h2 className="font-semibold italic text-lg mb-2">Building</h2>
                <div className="flex justify-center gap-4 flex-wrap">
                    {loading ? (
                        <div className="text-sm">Loading...</div>
                    ) : (
                        blocks.map((block) => (
                            <button
                                key={block.id}
                                onClick={() => handleFilterChange('selectedBlock', block.block_code)}
                                className={`px-4 py-2 ${filters.selectedBlock === block.block_code
                                    ? 'bg-gray-700 text-white'
                                    : 'border border-gray-400'
                                    }`}
                            >
                                {block.block_code}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Category - Visual only */}
            <div className="flex justify-center gap-4 mb-6 opacity-60">
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]" disabled>APARTMENT</button>
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]" disabled>COMMERCIAL</button>
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]" disabled>PARKING</button>
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]" disabled>RENT</button>
            </div>

            {/* Number of Rooms */}
            <div className="text-center mb-6">
                <h2 className="text-[#cfa84f] italic font-semibold mb-2">Number Of Rooms</h2>
                <div className="flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => handleFilterChange('apartmentType', 'ALL')}
                        className={`px-4 py-2 ${filters.apartmentType === 'ALL'
                            ? 'bg-[#cfa84f] text-white'
                            : 'border border-gray-400'
                            }`}
                    >
                        ALL
                    </button>
                    {statistics?.byType?.map((type) => (
                        <button
                            key={type.apartment_type}
                            onClick={() => handleFilterChange('apartmentType', type.apartment_type)}
                            className={`px-3 py-2 ${filters.apartmentType === type.apartment_type
                                ? 'bg-[#cfa84f] text-white'
                                : 'border border-gray-400'
                                }`}
                        >
                            {type.apartment_type === 'სტუდიო' ? 'STUDIO' :
                                type.apartment_type === '1 საძინ' ? '1' :
                                    type.apartment_type === '2 საძინ' ? '2' :
                                        type.apartment_type === '5 საძინ' ? '5' : type.apartment_type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Total Area */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Total Area</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From {statistics?.overall?.min_area || 25.90} m²</span>
                    <span>To {statistics?.overall?.max_area || 440.10} m²</span>
                </div>
                <input
                    type="range"
                    className="w-full accent-[#cfa84f]"
                    min={statistics?.overall?.min_area || 25.90}
                    max={statistics?.overall?.max_area || 440.10}
                    value={filters.maxArea}
                    onChange={(e) => handleFilterChange('maxArea', parseFloat(e.target.value))}
                />
                <div className="text-xs text-gray-600 mt-1">Current: {filters.maxArea} m²</div>
                <button className="mt-2 border border-gray-400 px-4 py-1 opacity-50">Exact Number</button>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Price</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From 100 m²</span>
                    <span>To 2000 m²</span>
                </div>
                <input type="range" className="w-full accent-[#cfa84f]" />
                <button className="mt-2 border border-gray-400 px-4 py-1">Exact Price</button>
            </div>

            {/* Floor */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Floor</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From 1</span>
                    <span>To {blocks.find(b => b.block_code === filters.selectedBlock)?.total_floors || 20}</span>
                </div>
                <input
                    type="range"
                    className="w-full accent-[#cfa84f]"
                    min="1"
                    max={blocks.find(b => b.block_code === filters.selectedBlock)?.total_floors || 20}
                    onChange={(e) => handleFilterChange('floor', parseInt(e.target.value))}
                />
                <div className="text-xs text-gray-600 mt-1">
                    {filters.floor === 'ALL' ? 'All Floors' : `Floor ${filters.floor}`}
                </div>
                <button className="mt-2 border border-gray-400 px-4 py-1 opacity-50">Exact Number</button>
            </div>

            {/* Additional Parameters */}
            <div className="text-left mb-6">
                <h2 className="font-semibold mb-2">Additional Parameters</h2>
                <p className="text-sm">
                    Bathroom with window | Master bedroom | <span className="text-[#cfa84f]">Terrace</span>
                    <br />
                    More than 2 windows | Windows on 3 sides | Street view
                </p>
            </div>

            {/* Choose Apartment Button */}
            <button
                onClick={handleChooseApartment}
                className="w-full bg-[#cfa84f] hover:bg-[#b8863c] text-white py-3 uppercase font-semibold transition-colors"
            >
                Choose an apartment
            </button>
        </div>
    );
}
