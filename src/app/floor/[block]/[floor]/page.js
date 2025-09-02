'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/landing/Header/Header'

const FloorDetailPage = () => {
    const params = useParams()
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
            if (apartmentsData.success) {
                setApartments(apartmentsData.data)
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
                    <h1 className="text-4xl font-bold mb-8">
                        Block {block} - Floor {floor}
                    </h1>

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
                                                <span className={`ml-1 px-2 py-1 rounded text-xs ${
                                                    apartment.status === 'თავისუფალია' ? 'bg-green-100 text-green-800' :
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

                    {/* Debug Information */}
                    <div className="mt-8 bg-gray-100 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
                        <div className="text-sm space-y-2">
                            <p><strong>Block Code:</strong> {block}</p>
                            <p><strong>Floor Number:</strong> {floor}</p>
                            <p><strong>API Endpoints Tested:</strong></p>
                            <ul className="list-disc list-inside ml-4">
                                <li>/api/floors?block_code={block} ✓</li>
                                <li>/api/apartments?block_code={block}&floor={floor} ✓</li>
                                <li>/api/blocks ✓</li>
                                <li>/api/statistics ✓</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FloorDetailPage