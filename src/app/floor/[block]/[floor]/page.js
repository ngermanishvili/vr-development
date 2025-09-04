'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/landing/Header/Header'
import Sidebar from '@/components/apartment/sidebar'

const FloorDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const { block } = params
    const [currentFloor, setCurrentFloor] = useState(params.floor)

    const [floorData, setFloorData] = useState(null)
    const [apartments, setApartments] = useState([])
    const [blockInfo, setBlockInfo] = useState(null)
    const [statistics, setStatistics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingFloorData, setLoadingFloorData] = useState(false)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1.2)

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    useEffect(() => {
        if (block && currentFloor) {
            fetchAllData()
        }
    }, [block])

    useEffect(() => {
        if (block && currentFloor && blockInfo) {
            fetchFloorData()
        }
    }, [currentFloor])

    const fetchAllData = async () => {
        try {
            setLoading(true)

            // Fetch block info
            const blocksResponse = await fetch('/api/blocks')
            const blocksData = await blocksResponse.json()
            if (blocksData.success) {
                const currentBlock = blocksData.data.find(b => b.block_code === block)
                setBlockInfo(currentBlock)
            }

            // Fetch statistics
            const statsResponse = await fetch('/api/statistics')
            const statsData = await statsResponse.json()
            if (statsData.success) {
                setStatistics(statsData.data)
            }

            await fetchFloorData()

        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchFloorData = async () => {
        try {
            setLoadingFloorData(true)

            // Fetch floor data
            const floorResponse = await fetch(`/api/floors?block_code=${block}`)
            const floorData = await floorResponse.json()
            if (floorData.success) {
                const floor = floorData.data.find(f => f.floor_number.toString() === currentFloor)
                setFloorData(floor)
            }

            // Fetch apartments for this floor
            const apartmentsResponse = await fetch(`/api/apartments?block_code=${block}&floor=${currentFloor}`)
            const apartmentsData = await apartmentsResponse.json()
            if (apartmentsData.success) {
                setApartments(apartmentsData.data)
            }

        } catch (error) {
            console.error('Error fetching floor data:', error)
        } finally {
            setLoadingFloorData(false)
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
                    {(block === 'c' || block === 'C' || block === 'C1' || block === 'c1' ||
                        block === 'a' || block === 'A' || block === 'A1' || block === 'a1' ||
                        block === 'b1' || block === 'B1' || block === 'b2' || block === 'B2') && (
                            <div className="relative overflow-hidden">
                                {/* Floor Selector - Inside Photo */}
                                {blockInfo && blockInfo.total_floors > 0 && (
                                    <div className="absolute top-4 right-4 z-20 bg-white rounded-lg shadow-lg p-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold text-gray-700">Floor:</span>
                                            <div className="flex gap-1">
                                                {Array.from({ length: blockInfo.total_floors }, (_, i) => i + 1).map((floorNum) => (
                                                    <button
                                                        key={floorNum}
                                                        onClick={() => setCurrentFloor(floorNum.toString())}
                                                        className={`px-2 py-1 rounded text-sm transition-all duration-200 ${parseInt(currentFloor) === floorNum
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {floorNum}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="w-full h-screen max-h-screen relative overflow-hidden bg-gray-100 ">
                                    {loadingFloorData && (
                                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-30">
                                            <div className="text-lg font-semibold text-gray-600">Loading floor data...</div>
                                        </div>
                                    )}
                                    <div className="relative w-full h-full">
                                        {/* Background image with cover */}
                                        <img
                                            src={
                                                (block === 'a' || block === 'A' || block === 'A1' || block === 'a1')
                                                    ? `/a-block-floors/a-${currentFloor}.jpg`
                                                    : (block === 'b1' || block === 'B1')
                                                        ? `/b1-block-floors/b-${currentFloor}.jpg`
                                                        : (block === 'b2' || block === 'B2')
                                                            ? `/b2-block-floors/b2-${currentFloor}.jpg`
                                                            : `/c-block-floors/c-${currentFloor}.jpg`
                                            }
                                            alt={`Floor ${currentFloor} plan for Block ${block}`}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                        {/* SVG Overlay - positioned absolutely over the image */}
                                        {apartments.length > 0 && (
                                            <svg
                                                className="absolute inset-0 w-full h-full pointer-events-none"
                                                viewBox={
                                                    // Different blocks may have different coordinate systems
                                                    (block === 'c' || block === 'C' || block === 'C1' || block === 'c1')
                                                        ? "0 0 1275 720"  // C block coords were created on 1280×720 canvas
                                                        : (block === 'b1' || block === 'B1')
                                                            ? "0 0 1280 648"  // B1 block coords
                                                            : (block === 'b2' || block === 'B2')
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
                                                                // Show tooltip
                                                                const tooltip = document.getElementById(`tooltip-${apartment.id}`)
                                                                if (tooltip) tooltip.style.display = 'block'
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.fillOpacity = '0.3'
                                                                e.target.style.strokeWidth = '1.5'
                                                                // Hide tooltip
                                                                const tooltip = document.getElementById(`tooltip-${apartment.id}`)
                                                                if (tooltip) tooltip.style.display = 'none'
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
                        Block {block} - Floor {currentFloor}
                    </h1>

                    {/* Floor Selector for Mobile */}
                    {blockInfo && blockInfo.total_floors > 0 && (
                        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2">Select Floor:</h3>
                            <div className="flex gap-2 flex-wrap">
                                {Array.from({ length: blockInfo.total_floors }, (_, i) => i + 1).map((floorNum) => (
                                    <button
                                        key={floorNum}
                                        onClick={() => setCurrentFloor(floorNum.toString())}
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
                    {(block === 'c' || block === 'C' || block === 'C1' || block === 'c1' ||
                        block === 'a' || block === 'A' || block === 'A1' || block === 'a1' ||
                        block === 'b1' || block === 'B1' || block === 'b2' || block === 'B2') && (
                            <div className="bg-white rounded-lg shadow-lg p-4">
                                <h2 className="text-lg font-semibold mb-2">Floor Plan</h2>
                                <div className="relative inline-block w-full">
                                    <img
                                        src={
                                            (block === 'a' || block === 'A' || block === 'A1' || block === 'a1')
                                                ? `/a-block-floors/a-${currentFloor}.jpg`
                                                : (block === 'b1' || block === 'B1')
                                                    ? `/b1-block-floors/b-${currentFloor}.jpg`
                                                    : (block === 'b2' || block === 'B2')
                                                        ? `/b2-block-floors/b2-${currentFloor}.jpg`
                                                        : `/c-block-floors/c-${currentFloor}.jpg`
                                        }
                                        alt={`Floor ${currentFloor} plan for Block ${block}`}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                    {/* SVG Overlay for Mobile */}
                                    {apartments.length > 0 && (
                                        <svg
                                            className="absolute inset-0 w-full h-full"
                                            viewBox={
                                                (block === 'c' || block === 'C' || block === 'C1' || block === 'c1')
                                                    ? "0 0 1275 720"
                                                    : (block === 'b1' || block === 'B1')
                                                        ? "0 0 1280 648"
                                                        : (block === 'b2' || block === 'B2')
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
        </div>
    )
}

export default FloorDetailPage