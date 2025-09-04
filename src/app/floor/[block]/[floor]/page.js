'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/landing/Header/Header'
import Sidebar from '@/components/apartment/sidebar'
import ApartmentTooltip from '@/components/ui/ApartmentTooltip'
import FloorTooltip from '@/components/ui/FloorTooltip'

const FloorDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const [currentBlock, setCurrentBlock] = useState(params.block)
    const [currentFloor, setCurrentFloor] = useState(params.floor)

    const [floorData, setFloorData] = useState(null)
    const [apartments, setApartments] = useState([])
    const [blockInfo, setBlockInfo] = useState(null)
    const [statistics, setStatistics] = useState(null)
    const [loading, setLoading] = useState(true)
    // Remove loadingFloorData for seamless experience
    // const [loadingFloorData, setLoadingFloorData] = useState(false)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1.2)

    // Tooltip state
    const [tooltipData, setTooltipData] = useState({
        visible: false,
        apartment: null,
        x: 0,
        y: 0
    })

    // Floor Tooltip state
    const [floorTooltipData, setFloorTooltipData] = useState({
        visible: false,
        floorNumber: null,
        availableCount: 0,
        x: 0,
        y: 0
    })

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    useEffect(() => {
        if (currentBlock && currentFloor) {
            // Only show loading on initial page load, not on block switches
            if (!blockInfo) {
                setLoading(true)
            }
            fetchAllData()
        }
    }, [currentBlock])

    useEffect(() => {
        if (currentBlock && currentFloor && blockInfo) {
            fetchFloorData()
        }
    }, [currentFloor])

    // Listen for URL changes and custom events
    useEffect(() => {
        const handleBlockChanged = (event) => {
            const { block: newBlock, floor: newFloor } = event.detail
            // Clear apartments immediately to avoid misaligned polygons
            setApartments([])
            setCurrentBlock(newBlock)
            setCurrentFloor(newFloor)
        }

        window.addEventListener('blockChanged', handleBlockChanged)
        
        return () => {
            window.removeEventListener('blockChanged', handleBlockChanged)
        }
    }, [])

    const fetchAllData = async () => {
        try {
            // Don't show loading overlay for seamless block switching
            // setLoading(true)

            // Clear apartments first to avoid misaligned polygons
            setApartments([])

            // Fetch all data in parallel for better performance
            const [blocksResponse, statsResponse, floorResponse, apartmentsResponse] = await Promise.all([
                fetch('/api/blocks'),
                fetch('/api/statistics'),
                fetch(`/api/floors?block_code=${currentBlock}`),
                fetch(`/api/apartments?block_code=${currentBlock}&floor=${currentFloor}`)
            ])

            // Process block info
            const blocksData = await blocksResponse.json()
            if (blocksData.success) {
                const blockInfo = blocksData.data.find(b =>
                    b.block_code.toUpperCase() === currentBlock.toUpperCase()
                )
                setBlockInfo(blockInfo)
            }

            // Process statistics
            const statsData = await statsResponse.json()
            if (statsData.success) {
                setStatistics(statsData.data)
            }

            // Process floor data
            const floorData = await floorResponse.json()
            if (floorData.success) {
                const floor = floorData.data.find(f => f.floor_number.toString() === currentFloor)
                setFloorData(floor)
            }

            // Process apartments - set them last to ensure proper alignment
            const apartmentsData = await apartmentsResponse.json()
            if (apartmentsData.success) {
                setApartments(apartmentsData.data)
            }

        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            // Always set loading to false after data fetching
            setLoading(false)
        }
    }

    const fetchFloorData = async () => {
        try {
            // Remove loading state for seamless experience
            // setLoadingFloorData(true)

            // Fetch floor data
            const floorResponse = await fetch(`/api/floors?block_code=${currentBlock}`)
            const floorData = await floorResponse.json()
            if (floorData.success) {
                const floor = floorData.data.find(f => f.floor_number.toString() === currentFloor)
                setFloorData(floor)
            }

            // Fetch apartments for this floor
            const apartmentsResponse = await fetch(`/api/apartments?block_code=${currentBlock}&floor=${currentFloor}`)
            const apartmentsData = await apartmentsResponse.json()
            if (apartmentsData.success) {
                setApartments(apartmentsData.data)
            }

        } catch (error) {
            console.error('Error fetching floor data:', error)
        } finally {
            // setLoadingFloorData(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading floor data...</div>
            </div>
        )
    }

    return (
        <div className="relative">
            <Header />
            {/* Desktop Layout */}
            <div className="hidden md:flex pt-24 relative">
                {/* Show Sidebar Button - when collapsed */}
                {isSidebarCollapsed && (
                    <div className="w-12 flex items-center justify-center bg-white border-r border-gray-200">
                        <button
                            onClick={toggleSidebar}
                            className="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg rounded"
                            title="Show Sidebar"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className={`${isSidebarCollapsed ? 'w-0' : 'w-[25%]'} transition-all duration-300 ease-in-out z-50 relative`}>
                    <Sidebar isCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />
                </div>
                <div className={`${isSidebarCollapsed ? 'flex-1' : 'w-[75%]'} transition-all duration-300 ease-in-out relative`}>
                    {/* Floor Plan Image with Interactive Apartments */}
                    {(currentBlock === 'c' || currentBlock === 'C' || currentBlock === 'C1' || currentBlock === 'c1' ||
                        currentBlock === 'a' || currentBlock === 'A' || currentBlock === 'A1' || currentBlock === 'a1' ||
                        currentBlock === 'b1' || currentBlock === 'B1' || currentBlock === 'b2' || currentBlock === 'B2') && (
                            <div className="relative overflow-hidden">
                                {/* Floor Selector - Vertical Column Design */}
                                {blockInfo && blockInfo.total_floors > 0 && (
                                    <div className="absolute top-0 right-0 z-20">
                                        <div className="flex flex-col items-center justify-start bg-white/10 w-20 py-6 rounded-lg backdrop-blur-sm">
                                            <h2 className="text-white font-bold mb-6 text-sm">FLOOR</h2>
                                            <ul className="flex flex-col space-y-4 text-white text-lg">
                                                {(() => {
                                                    // Special handling for A block - floors 2-8 only
                                                    if (currentBlock === 'a' || currentBlock === 'A' || currentBlock === 'A1' || currentBlock === 'a1') {
                                                        return Array.from({ length: 7 }, (_, i) => i + 2).map((floorNum) => (
                                                            <li key={floorNum}>
                                                                <button
                                                                    onClick={() => {
                                                                        // Clear apartments immediately when changing floors
                                                                        setApartments([])
                                                                        setCurrentFloor(floorNum.toString())
                                                                        // Update URL when floor changes
                                                                        window.history.pushState({}, '', `/floor/${currentBlock}/${floorNum}`)
                                                                    }}
                                                                    className={`px-4 py-1 font-bold rounded transition-all duration-200 cursor-pointer ${parseInt(currentFloor) === floorNum
                                                                        ? 'bg-white/60 text-black'
                                                                        : 'text-white'
                                                                        }`}
                                                                >
                                                                    {floorNum}
                                                                </button>
                                                            </li>
                                                        ))
                                                    } else {
                                                        // Default behavior for other blocks - floors 1 to total_floors
                                                        return Array.from({ length: blockInfo.total_floors }, (_, i) => i + 1).map((floorNum) => (
                                                            <li key={floorNum}>
                                                                <button
                                                                    onClick={() => {
                                                                        // Clear apartments immediately when changing floors
                                                                        setApartments([])
                                                                        setCurrentFloor(floorNum.toString())
                                                                        // Update URL when floor changes
                                                                        window.history.pushState({}, '', `/floor/${currentBlock}/${floorNum}`)
                                                                    }}
                                                                    className={`px-4 py-1 font-bold rounded transition-all duration-200 cursor-pointer ${parseInt(currentFloor) === floorNum
                                                                        ? 'bg-white/60 text-black'
                                                                        : 'text-white'
                                                                        }`}
                                                                >
                                                                    {floorNum}
                                                                </button>
                                                            </li>
                                                        ))
                                                    }
                                                })()}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                <div className="w-full h-screen max-h-screen relative overflow-hidden bg-gray-100 ">
                                    {/* Remove loading overlay for seamless experience */}
                                    {/* {loadingFloorData && (
                                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-30">
                                            <div className="text-lg font-semibold text-gray-600">Loading floor data...</div>
                                        </div>
                                    )} */}
                                    <div className="relative w-full h-full">
                                        {/* Background image with cover */}
                                        <img
                                            src={
                                                (currentBlock === 'a' || currentBlock === 'A' || currentBlock === 'A1' || currentBlock === 'a1')
                                                    ? `/a-block-floors/a-${currentFloor}.jpg`
                                                    : (currentBlock === 'b1' || currentBlock === 'B1')
                                                        ? `/b1-block-floors/b-${currentFloor}.jpg`
                                                        : (currentBlock === 'b2' || currentBlock === 'B2')
                                                            ? `/b2-block-floors/b2-${currentFloor}.jpg`
                                                            : `/c-block-floors/c-${currentFloor}.jpg`
                                            }
                                            alt={`Floor ${currentFloor} plan for Block ${currentBlock}`}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                        {/* SVG Overlay - positioned absolutely over the image */}
                                        {apartments.length > 0 && (
                                            <svg
                                                className="absolute inset-0 w-full h-full pointer-events-none"
                                                viewBox={
                                                    // Different blocks may have different coordinate systems
                                                    (currentBlock === 'c' || currentBlock === 'C' || currentBlock === 'C1' || currentBlock === 'c1')
                                                        ? "0 0 1275 720"  // C block coords were created on 1280×720 canvas
                                                        : (currentBlock === 'b1' || currentBlock === 'B1')
                                                            ? "0 0 1280 648"  // B1 block coords
                                                            : (currentBlock === 'b2' || currentBlock === 'B2')
                                                                ? "0 0 1280 728"  // B2 block coords
                                                                : "0 0 1280 640"  // A block coords were created on 1280×640 canvas
                                                }
                                                preserveAspectRatio="xMidYMid slice"
                                            >
                                                {apartments.map((apartment) => apartment.coords && (
                                                    <g key={apartment.id}>
                                                        <polygon
                                                            points={apartment.coords}
                                                            fill={
                                                                apartment.status === 'თავისუფალია' ? 'rgba(34, 197, 94, 0.3)' :  // მწვანე
                                                                    apartment.status === 'გაყიდული' ? 'rgba(239, 68, 68, 0.3)' :      // წითელი
                                                                        apartment.status === 'დაჯავშნილია' ? 'rgba(251, 191, 36, 0.3)' :  // ყვითელი
                                                                            'rgba(156, 163, 175, 0.3)'  // ნაცრისფერი default
                                                            }
                                                            stroke={
                                                                apartment.status === 'თავისუფალია' ? '#22c55e' :
                                                                    apartment.status === 'გაყიდული' ? '#ef4444' :
                                                                        apartment.status === 'დაჯავშნილია' ? '#fbbf24' :
                                                                            '#9ca3af'
                                                            }
                                                            strokeWidth="1.5"
                                                            className="transition-all duration-200 cursor-pointer hover:stroke-2 pointer-events-auto"
                                                            onMouseEnter={(e) => {
                                                                e.target.style.fillOpacity = '0.6'
                                                                e.target.style.strokeWidth = '3'

                                                                // Show tooltip at cursor position
                                                                setTooltipData({
                                                                    visible: true,
                                                                    apartment: apartment,
                                                                    x: 0, // will be updated by mouse move
                                                                    y: 0
                                                                })
                                                            }}
                                                            onMouseMove={(e) => {
                                                                // Update tooltip position
                                                                setTooltipData(prev => ({
                                                                    ...prev,
                                                                    x: e.clientX,
                                                                    y: e.clientY
                                                                }))
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.fillOpacity = '0.3'
                                                                e.target.style.strokeWidth = '1.5'

                                                                // Hide tooltip
                                                                setTooltipData(prev => ({
                                                                    ...prev,
                                                                    visible: false
                                                                }))
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                // Show apartment details in an alert or modal
                                                                alert(`ბინა #${apartment.apartment_number}\nფართობი: ${apartment.total_area} კვ.მ\nსტატუსი: ${apartment.status}\nტიპი: ${apartment.apartment_type}`)
                                                            }}
                                                        >
                                                            <title>
                                                                ბინა #{apartment.apartment_number}
                                                                {'\n'}ფართობი: {apartment.total_area} კვ.მ
                                                                {'\n'}სტატუსი: {apartment.status}
                                                                {'\n'}ტიპი: {apartment.apartment_type}
                                                            </title>
                                                        </polygon>
                                                    </g>
                                                ))}
                                            </svg>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )}

                    {/* Floor Information - HIDDEN */}
                    {/* {floorData && (
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Floor Information</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded">
                                    <div className="text-2xl font-bold text-blue-600">{floorData.apartment_count}</div>
                                    <div className="text-sm text-gray-600">Total Apartments</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded">
                                    <div className="text-2xl font-bold text-green-600">{floorData.available_count}</div>
                                    <div className="text-sm text-gray-600">Available</div>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded">
                                    <div className="text-2xl font-bold text-red-600">{floorData.sold_count}</div>
                                    <div className="text-sm text-gray-600">Sold</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded">
                                    <div className="text-2xl font-bold text-yellow-600">{floorData.reserved_count}</div>
                                    <div className="text-sm text-gray-600">Reserved</div>
                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* Block Information - HIDDEN */}
                    {/* {blockInfo && (
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Block Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p><strong>Block Name:</strong> {blockInfo.block_name}</p>
                                    <p><strong>Block Code:</strong> {blockInfo.block_code}</p>
                                    <p><strong>Total Floors:</strong> {blockInfo.total_floors}</p>
                                    <p><strong>Building Type:</strong> {blockInfo.building_type}</p>
                                </div>
                                <div>
                                    <p><strong>Total Apartments:</strong> {blockInfo.total_apartments}</p>
                                    <p><strong>Available:</strong> {blockInfo.available_apartments}</p>
                                    <p><strong>Sold:</strong> {blockInfo.sold_apartments}</p>
                                    <p><strong>Reserved:</strong> {blockInfo.reserved_apartments}</p>
                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* Apartments List - HIDDEN */}
                    {/* {apartments.length > 0 && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Apartments on this Floor</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {apartments.map((apartment) => (
                                    <div key={apartment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-lg mb-2">
                                            Apartment {apartment.apartment_number}
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <p><strong>Type:</strong> {apartment.apartment_type}</p>
                                            <p><strong>Area:</strong> {apartment.total_area} m²</p>
                                            <p><strong>Status:</strong>
                                                <span className={`ml-1 px-2 py-1 rounded text-xs ${apartment.status === 'თავისუფალია' ? 'bg-green-100 text-green-800' :
                                                    apartment.status === 'გაყიდული' ? 'bg-red-100 text-red-800' :
                                                        apartment.status === 'დაჯავშნილია' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {apartment.status}
                                                </span>
                                            </p>
                                            {apartment.price && <p><strong>Price:</strong> ${apartment.price}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} */}

                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden pt-20">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">
                        Block {currentBlock} - Floor {currentFloor}
                    </h1>

                    {/* Floor Selector for Mobile */}
                    {blockInfo && blockInfo.total_floors > 0 && (
                        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2">Select Floor:</h3>
                            <div className="flex gap-2 flex-wrap">
                                {(() => {
                                    // Special handling for A block - floors 2-8 only
                                    if (currentBlock === 'a' || currentBlock === 'A' || currentBlock === 'A1' || currentBlock === 'a1') {
                                        return Array.from({ length: 7 }, (_, i) => i + 2)
                                    } else {
                                        // Default behavior for other blocks - floors 1 to total_floors
                                        return Array.from({ length: blockInfo.total_floors }, (_, i) => i + 1)
                                    }
                                })().map((floorNum) => (
                                    <button
                                        key={floorNum}
                                        onClick={() => {
                                            // Clear apartments immediately when changing floors
                                            setApartments([])
                                            setCurrentFloor(floorNum.toString())
                                            // Update URL when floor changes
                                            window.history.pushState({}, '', `/floor/${currentBlock}/${floorNum}`)
                                        }}
                                        onMouseEnter={async (e) => {
                                            // Fetch available count for this floor
                                            try {
                                                const response = await fetch(`/api/floors?block_code=${currentBlock}`)
                                                const data = await response.json()
                                                if (data.success) {
                                                    const floorData = data.data.find(f => f.floor_number === floorNum)
                                                    const availableCount = floorData?.available_count || 0

                                                    setFloorTooltipData({
                                                        visible: true,
                                                        floorNumber: floorNum,
                                                        availableCount: availableCount,
                                                        x: e.clientX,
                                                        y: e.clientY
                                                    })
                                                }
                                            } catch (error) {
                                                console.error('Error fetching floor data:', error)
                                            }
                                        }}
                                        onMouseMove={(e) => {
                                            setFloorTooltipData(prev => ({
                                                ...prev,
                                                x: e.clientX,
                                                y: e.clientY
                                            }))
                                        }}
                                        onMouseLeave={() => {
                                            setFloorTooltipData(prev => ({
                                                ...prev,
                                                visible: false
                                            }))
                                        }}
                                        className={`px-3 py-1 rounded-lg transition-all duration-200 text-sm ${parseInt(currentFloor) === floorNum
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Floor {floorNum}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Floor Plan for Mobile */}
                    {(currentBlock === 'c' || currentBlock === 'C' || currentBlock === 'C1' || currentBlock === 'c1' ||
                        currentBlock === 'a' || currentBlock === 'A' || currentBlock === 'A1' || currentBlock === 'a1' ||
                        currentBlock === 'b1' || currentBlock === 'B1' || currentBlock === 'b2' || currentBlock === 'B2') && (
                            <div className="bg-white rounded-lg shadow-lg p-4">
                                <h2 className="text-lg font-semibold mb-2">Floor Plan</h2>
                                <div className="relative inline-block w-full">
                                    <img
                                        src={
                                            (currentBlock === 'a' || currentBlock === 'A' || currentBlock === 'A1' || currentBlock === 'a1')
                                                ? `/a-block-floors/a-${currentFloor}.jpg`
                                                : (currentBlock === 'b1' || currentBlock === 'B1')
                                                    ? `/b1-block-floors/b-${currentFloor}.jpg`
                                                    : (currentBlock === 'b2' || currentBlock === 'B2')
                                                        ? `/b2-block-floors/b2-${currentFloor}.jpg`
                                                        : `/c-block-floors/c-${currentFloor}.jpg`
                                        }
                                        alt={`Floor ${currentFloor} plan for Block ${currentBlock}`}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                    {/* SVG Overlay for Mobile */}
                                    {apartments.length > 0 && (
                                        <svg
                                            className="absolute inset-0 w-full h-full"
                                            viewBox={
                                                (currentBlock === 'c' || currentBlock === 'C' || currentBlock === 'C1' || currentBlock === 'c1')
                                                    ? "0 0 1275 720"
                                                    : (currentBlock === 'b1' || currentBlock === 'B1')
                                                        ? "0 0 1280 648"
                                                        : (currentBlock === 'b2' || currentBlock === 'B2')
                                                            ? "0 0 1280 728"
                                                            : "0 0 1280 640"
                                            }
                                            preserveAspectRatio="xMidYMid meet"
                                            style={{ pointerEvents: 'auto' }}
                                        >
                                            {apartments.map((apartment) => apartment.coords && (
                                                <g key={apartment.id}>
                                                    <polygon
                                                        points={apartment.coords}
                                                        fill={
                                                            apartment.status === 'თავისუფალია' ? 'rgba(34, 197, 94, 0.3)' :
                                                                apartment.status === 'გაყიდული' ? 'rgba(239, 68, 68, 0.3)' :
                                                                    apartment.status === 'დაჯავშნილია' ? 'rgba(251, 191, 36, 0.3)' :
                                                                        'rgba(156, 163, 175, 0.3)'
                                                        }
                                                        stroke={
                                                            apartment.status === 'თავისუფალია' ? '#22c55e' :
                                                                apartment.status === 'გაყიდული' ? '#ef4444' :
                                                                    apartment.status === 'დაჯავშნილია' ? '#fbbf24' :
                                                                        '#9ca3af'
                                                        }
                                                        strokeWidth="1.5"
                                                        className="transition-all duration-200 cursor-pointer hover:stroke-2"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            alert(`ბინა #${apartment.apartment_number}\nფართობი: ${apartment.total_area} კვ.მ\nსტატუსი: ${apartment.status}\nტიპი: ${apartment.apartment_type}`)
                                                        }}
                                                    >
                                                        <title>
                                                            ბინა #{apartment.apartment_number}
                                                            {'\n'}ფართობი: {apartment.total_area} კვ.მ
                                                            {'\n'}სტატუსი: {apartment.status}
                                                            {'\n'}ტიპი: {apartment.apartment_type}
                                                        </title>
                                                    </polygon>
                                                </g>
                                            ))}
                                        </svg>
                                    )}
                                </div>

                            </div>
                        )}

                </div>
                <Sidebar isCollapsed={false} isMobile={true} onToggleSidebar={toggleSidebar} />
            </div>

            {/* Custom Tooltips */}
            <ApartmentTooltip
                apartment={tooltipData.apartment}
                blockCode={blockInfo?.block_code || currentBlock?.toUpperCase()}
                x={tooltipData.x}
                y={tooltipData.y}
                visible={tooltipData.visible}
            />

            <FloorTooltip
                floorNumber={floorTooltipData.floorNumber}
                availableCount={floorTooltipData.availableCount}
                x={floorTooltipData.x}
                y={floorTooltipData.y}
                visible={floorTooltipData.visible}
            />
        </div>
    )
}

export default FloorDetailPage