'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { DualRangeSlider } from '../ui/dual-range-slider'

export default function Sidebar({ isCollapsed, isMobile, onToggleSidebar }) {
    const [blocks, setBlocks] = useState([])
    const [statistics, setStatistics] = useState(null)
    const [filters, setFilters] = useState({
        selectedBlock: '',
        apartmentType: 'ALL',
        minArea: 26,
        maxArea: 440,
        minFloor: 1,
        maxFloor: 6,
        sliderMinFloor: 1,
        sliderMaxFloor: 3,
        minPrice: 100,
        maxPrice: 2000,
        floor: 'ALL'
    })
    const [loading, setLoading] = useState(true)
    const [exactInputs, setExactInputs] = useState({
        area: false,
        price: false,
        floor: false
    })
    const [tempInputValues, setTempInputValues] = useState({
        minArea: '',
        maxArea: '',
        minPrice: '',
        maxPrice: '',
        minFloor: '',
        maxFloor: ''
    })
    const searchParams = useSearchParams()

    useEffect(() => {
        fetchData()
        // Set initial block from URL or pathname
        const blockFromUrl = searchParams.get('block')
        const currentPath = window.location.pathname
        const pathSegments = currentPath.split('/')
        const blockFromPath = pathSegments[2] // /floor/[block]/[floor] structure
        
        if (blockFromUrl) {
            setFilters(prev => ({ ...prev, selectedBlock: blockFromUrl }))
        } else if (blockFromPath) {
            setFilters(prev => ({ ...prev, selectedBlock: blockFromPath.toUpperCase() }))
        }
    }, [searchParams])

    // Update floor range when blocks data or selected block changes
    useEffect(() => {
        if (blocks.length > 0 && filters.selectedBlock) {
            const currentBlock = blocks.find(b => b.block_code === filters.selectedBlock)
            if (currentBlock && currentBlock.total_floors) {
                const totalFloors = Number(currentBlock.total_floors);
                setFilters(prev => ({ 
                    ...prev, 
                    minFloor: 1,
                    maxFloor: totalFloors,
                    // Set initial slider range to show a subset, not the full range
                    sliderMinFloor: 1,
                    sliderMaxFloor: Math.min(3, totalFloors) // Start with floors 1-3 or max available
                }))
            }
        }
    }, [blocks, filters.selectedBlock])

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
        
        // If block is changed, navigate to the new block's page
        if (filterType === 'selectedBlock' && value) {
            const currentPath = window.location.pathname
            const pathSegments = currentPath.split('/')
            // Keep the current floor number or default to 1
            const currentFloor = pathSegments[3] || '1'
            // Navigate to the new block with the same floor
            window.location.href = `/floor/${value.toLowerCase()}/${currentFloor}`
        }
    }

    const handleAreaRangeChange = (values) => {
        const [minVal, maxVal] = values
        if (minVal !== undefined && maxVal !== undefined && !isNaN(minVal) && !isNaN(maxVal)) {
            setFilters(prev => ({ ...prev, minArea: minVal, maxArea: maxVal }))
        }
    }

    const handleFloorRangeChange = (values) => {
        const [minVal, maxVal] = values
        if (minVal !== undefined && maxVal !== undefined && !isNaN(minVal) && !isNaN(maxVal)) {
            setFilters(prev => ({ ...prev, sliderMinFloor: minVal, sliderMaxFloor: maxVal }))
        }
    }


    const toggleExactInput = (type) => {
        setExactInputs(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
        
        // ინიციალიზება temp values-ების
        if (!exactInputs[type]) {
            if (type === 'area') {
                setTempInputValues(prev => ({
                    ...prev,
                    minArea: filters.minArea.toString(),
                    maxArea: filters.maxArea.toString()
                }))
            } else if (type === 'price') {
                setTempInputValues(prev => ({
                    ...prev,
                    minPrice: filters.minPrice.toString(),
                    maxPrice: filters.maxPrice.toString()
                }))
            } else if (type === 'floor') {
                setTempInputValues(prev => ({
                    ...prev,
                    minFloor: filters.minFloor.toString(),
                    maxFloor: filters.maxFloor.toString()
                }))
            }
        }
    }

    const handleExactInputChange = (field, value) => {
        setTempInputValues(prev => ({ ...prev, [field]: value }))
    }

    const applyExactValues = (type) => {
        if (type === 'area') {
            const minVal = parseFloat(tempInputValues.minArea) || filters.minArea
            const maxVal = parseFloat(tempInputValues.maxArea) || filters.maxArea
            setFilters(prev => ({ ...prev, minArea: minVal, maxArea: maxVal }))
        } else if (type === 'price') {
            const minVal = parseFloat(tempInputValues.minPrice) || filters.minPrice
            const maxVal = parseFloat(tempInputValues.maxPrice) || filters.maxPrice
            setFilters(prev => ({ ...prev, minPrice: minVal, maxPrice: maxVal }))
        } else if (type === 'floor') {
            const minVal = parseInt(tempInputValues.minFloor) || filters.minFloor
            const maxVal = parseInt(tempInputValues.maxFloor) || filters.maxFloor
            setFilters(prev => ({ ...prev, minFloor: minVal, maxFloor: maxVal }))
        }
        toggleExactInput(type)
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
        if (filters.minArea) {
            queryParams.append('minArea', filters.minArea.toString())
        }
        if (filters.maxArea) {
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
                        <div className="px-2 mb-2 py-4">
                            {!loading && (
                                <DualRangeSlider
                                    min={Math.round(statistics?.overall?.min_area || 26)}
                                    max={Math.round(statistics?.overall?.max_area || 440)}
                                    step={1}
                                    value={[filters.minArea, filters.maxArea]}
                                    onValueChange={handleAreaRangeChange}
                                    className="relative z-10"
                                />
                            )}
                            {loading && (
                                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                            )}
                        </div>
                        <div className="text-xs text-gray-600 mt-3">
                            Range: {filters.minArea || 26} - {filters.maxArea || 440} m²
                        </div>
                        
                        {!exactInputs.area ? (
                            <button 
                                onClick={() => toggleExactInput('area')}
                                className="mt-2 border border-gray-400 px-3 py-1 text-xs hover:bg-gray-100 transition-colors"
                            >
                                Exact Number
                            </button>
                        ) : (
                            <div className="mt-3 space-y-2">
                                <div className="flex gap-2 text-xs">
                                    <div className="flex-1">
                                        <label className="block text-gray-600 mb-1">Min m²:</label>
                                        <input
                                            type="number"
                                            value={tempInputValues.minArea}
                                            onChange={(e) => handleExactInputChange('minArea', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-600 mb-1">Max m²:</label>
                                        <input
                                            type="number"
                                            value={tempInputValues.maxArea}
                                            onChange={(e) => handleExactInputChange('maxArea', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => applyExactValues('area')}
                                        className="flex-1 bg-[#cfa84f] text-white px-3 py-1 text-xs rounded hover:bg-[#b8863c] transition-colors"
                                    >
                                        Apply
                                    </button>
                                    <button 
                                        onClick={() => toggleExactInput('area')}
                                        className="flex-1 border border-gray-400 px-3 py-1 text-xs rounded hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Floor */}
                    <div className="text-center mb-4">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Floor</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>From 1</span>
                            <span>To {filters.maxFloor}</span>
                        </div>
                        <div className="px-2 mb-2 py-4">
                            {filters.maxFloor > 1 && (
                                <DualRangeSlider
                                    key={`floor-mobile-${filters.maxFloor}`}
                                    min={1}
                                    max={Number(filters.maxFloor)}
                                    step={1}
                                    value={[Number(filters.sliderMinFloor), Number(filters.sliderMaxFloor)]}
                                    onValueChange={handleFloorRangeChange}
                                    className="relative z-10"
                                />
                            )}
                        </div>
                        <div className="text-xs text-gray-600 mt-3">
                            Range: Floor {filters.sliderMinFloor} - {filters.sliderMaxFloor}
                        </div>
                        
                        {!exactInputs.floor ? (
                            <button 
                                onClick={() => toggleExactInput('floor')}
                                className="mt-2 border border-gray-400 px-3 py-1 text-xs hover:bg-gray-100 transition-colors"
                            >
                                Exact Number
                            </button>
                        ) : (
                            <div className="mt-3 space-y-2">
                                <div className="flex gap-2 text-xs">
                                    <div className="flex-1">
                                        <label className="block text-gray-600 mb-1">Min Floor:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={tempInputValues.minFloor}
                                            onChange={(e) => handleExactInputChange('minFloor', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-600 mb-1">Max Floor:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={tempInputValues.maxFloor}
                                            onChange={(e) => handleExactInputChange('maxFloor', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => applyExactValues('floor')}
                                        className="flex-1 bg-[#cfa84f] text-white px-3 py-1 text-xs rounded hover:bg-[#b8863c] transition-colors"
                                    >
                                        Apply
                                    </button>
                                    <button 
                                        onClick={() => toggleExactInput('floor')}
                                        className="flex-1 border border-gray-400 px-3 py-1 text-xs rounded hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
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
                <div className="px-4 mb-2 py-4">
                    {!loading && (
                        <DualRangeSlider
                            min={Math.round(statistics?.overall?.min_area || 26)}
                            max={Math.round(statistics?.overall?.max_area || 440)}
                            step={1}
                            value={[filters.minArea, filters.maxArea]}
                            onValueChange={handleAreaRangeChange}
                            className="relative z-10"
                        />
                    )}
                    {loading && (
                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    )}
                </div>
                <div className="text-xs text-gray-600 mt-4">
                    Range: {filters.minArea || 26} - {filters.maxArea || 440} m²
                </div>
                
                {!exactInputs.area ? (
                    <button 
                        onClick={() => toggleExactInput('area')}
                        className="mt-2 border border-gray-400 px-4 py-1 hover:bg-gray-100 transition-colors"
                    >
                        Exact Number
                    </button>
                ) : (
                    <div className="mt-3 space-y-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-gray-600 mb-1 text-sm">Min m²:</label>
                                <input
                                    type="number"
                                    value={tempInputValues.minArea}
                                    onChange={(e) => handleExactInputChange('minArea', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-600 mb-1 text-sm">Max m²:</label>
                                <input
                                    type="number"
                                    value={tempInputValues.maxArea}
                                    onChange={(e) => handleExactInputChange('maxArea', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => applyExactValues('area')}
                                className="flex-1 bg-[#cfa84f] text-white px-4 py-2 rounded hover:bg-[#b8863c] transition-colors"
                            >
                                Apply
                            </button>
                            <button 
                                onClick={() => toggleExactInput('area')}
                                className="flex-1 border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>


            {/* Floor */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Floor</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From 1</span>
                    <span>To {filters.maxFloor}</span>
                </div>
                <div className="px-4 mb-2 py-4">
                    {filters.maxFloor > 1 && (
                        <DualRangeSlider
                            key={`floor-desktop-${filters.maxFloor}`}
                            min={1}
                            max={Number(filters.maxFloor)}
                            step={1}
                            value={[Number(filters.sliderMinFloor), Number(filters.sliderMaxFloor)]}
                            onValueChange={handleFloorRangeChange}
                            className="relative z-10"
                        />
                    )}
                </div>
                <div className="text-xs text-gray-600 mt-4">
                    Range: Floor {filters.sliderMinFloor} - {filters.sliderMaxFloor}
                </div>
                
                {!exactInputs.floor ? (
                    <button 
                        onClick={() => toggleExactInput('floor')}
                        className="mt-2 border border-gray-400 px-4 py-1 hover:bg-gray-100 transition-colors"
                    >
                        Exact Number
                    </button>
                ) : (
                    <div className="mt-3 space-y-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-gray-600 mb-1 text-sm">Min Floor:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={tempInputValues.minFloor}
                                    onChange={(e) => handleExactInputChange('minFloor', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-600 mb-1 text-sm">Max Floor:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={tempInputValues.maxFloor}
                                    onChange={(e) => handleExactInputChange('maxFloor', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => applyExactValues('floor')}
                                className="flex-1 bg-[#cfa84f] text-white px-4 py-2 rounded hover:bg-[#b8863c] transition-colors"
                            >
                                Apply
                            </button>
                            <button 
                                onClick={() => toggleExactInput('floor')}
                                className="flex-1 border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
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
