'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/landing/Header/Header'

const FloorDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const { block, floor } = params

    const [floorData, setFloorData] = useState(null)
    const [apartments, setApartments] = useState([])
    const [blockInfo, setBlockInfo] = useState(null)
    const [statistics, setStatistics] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (block && floor) {
            fetchAllData()
        }
    }, [block, floor])

    const fetchAllData = async () => {
        try {
            setLoading(true)

            // Fetch floor data
            const floorResponse = await fetch(`/api/floors?block_code=${block}`)
            const floorData = await floorResponse.json()
            if (floorData.success) {
                const currentFloor = floorData.data.find(f => f.floor_number.toString() === floor)
                setFloorData(currentFloor)
            }

            // Fetch apartments for this floor
            const apartmentsResponse = await fetch(`/api/apartments?block_code=${block}&floor=${floor}`)
            const apartmentsData = await apartmentsResponse.json()
            console.log('Apartments API Response:', apartmentsData) // Debug log
            if (apartmentsData.success) {
                setApartments(apartmentsData.data)
                console.log('Apartments set:', apartmentsData.data) // Debug log
            }

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

        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
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
            <div className="pt-24 p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">
                        Block {block} - Floor {floor}
                    </h1>

                    {/* Floor Selector */}
                    {blockInfo && blockInfo.total_floors > 0 && (
                        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Select Floor:</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {Array.from({ length: blockInfo.total_floors }, (_, i) => i + 1).map((floorNum) => (
                                        <button
                                            key={floorNum}
                                            onClick={() => router.push(`/floor/${block}/${floorNum}`)}
                                            className={`px-4 py-2 rounded-lg transition-all duration-200 ${parseInt(floor) === floorNum
                                                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                                }`}
                                        >
                                            Floor {floorNum}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Floor Plan Image with Interactive Apartments */}
                    {(block === 'c' || block === 'C' || block === 'C1' || block === 'c1' ||
                        block === 'a' || block === 'A' || block === 'A1' || block === 'a1' ||
                        block === 'b1' || block === 'B1' || block === 'b2' || block === 'B2') && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Floor Plan - Click on an apartment to view details</h2>
                                <div className="flex justify-center">
                                    <div className="relative inline-block  ">
                                        <img
                                            src={
                                                (block === 'a' || block === 'A' || block === 'A1' || block === 'a1')
                                                    ? `/a-block-floors/a-${floor}.jpg`
                                                    : (block === 'b1' || block === 'B1')
                                                        ? `/b1-block-floors/b-${floor}.jpg`
                                                        : (block === 'b2' || block === 'B2')
                                                            ? `/b2-block-floors/b2-${floor}.jpg`
                                                            : `/c-block-floors/c-${floor}.jpg`
                                            }
                                            alt={`Floor ${floor} plan for Block ${block}`}
                                            className="max-w-full h-auto rounded-lg shadow-md"
                                            style={{ maxHeight: '600px' }}
                                        />
                                        {/* SVG Overlay for Interactive Apartments */}
                                        {apartments.length > 0 && (
                                            <svg
                                                className="absolute inset-0 w-full h-full"
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
                                                preserveAspectRatio="xMidYMid meet"
                                                style={{ pointerEvents: 'auto' }}
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
                                                            className="transition-all duration-200 cursor-pointer hover:stroke-2"
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
                                {/* Legend */}
                                <div className="mt-4 flex justify-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                                        <span>თავისუფალია</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                                        <span>გაყიდული</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-amber-500 rounded"></div>
                                        <span>დაჯავშნილია</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Floor Information */}
                    {floorData && (
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
                    )}

                    {/* Block Information */}
                    {blockInfo && (
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
                    )}

                    {/* Apartments List */}
                    {apartments.length > 0 && (
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
                    )}

                </div>
            </div>
        </div>
    )
}

export default FloorDetailPage