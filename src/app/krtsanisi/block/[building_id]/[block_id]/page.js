'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/landing/Header/Header'
import BackButton from '@/components/ui/BackButton'

const KrtsanisiBlockPage = () => {
    const params = useParams()
    const router = useRouter()
    const { building_id: buildingId, block_id: blockId } = params
    
    const [building, setBuilding] = useState(null)
    const [block, setBlock] = useState(null)
    const [apartments, setApartments] = useState([])
    const [filteredApartments, setFilteredApartments] = useState([])
    const [statistics, setStatistics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        if (buildingId && blockId) {
            fetchBlockData()
        }
    }, [buildingId, blockId])

    useEffect(() => {
        // Filter apartments based on status
        if (statusFilter === 'all') {
            setFilteredApartments(apartments)
        } else {
            setFilteredApartments(apartments.filter(apt => apt.status === statusFilter))
        }
    }, [apartments, statusFilter])

    const fetchBlockData = async () => {
        try {
            setLoading(true)
            
            // Fetch building, block, apartments, and statistics
            const [buildingsResponse, blocksResponse, apartmentsResponse, statsResponse] = await Promise.all([
                fetch('/api/krtsanisi/buildings'),
                fetch(`/api/krtsanisi/blocks?building_id=${buildingId}`),
                fetch(`/api/krtsanisi/apartments?building_id=${buildingId}&block_id=${blockId}&limit=100`),
                fetch(`/api/krtsanisi/statistics?building_id=${buildingId}&block_id=${blockId}`)
            ])
            
            const [buildingsData, blocksData, apartmentsData, statsData] = await Promise.all([
                buildingsResponse.json(),
                blocksResponse.json(),
                apartmentsResponse.json(),
                statsResponse.json()
            ])
            
            if (buildingsData.success) {
                const buildingData = buildingsData.data.find(b => b.id == buildingId)
                setBuilding(buildingData)
            }
            
            if (blocksData.success) {
                const blockData = blocksData.data.find(b => b.id == blockId)
                setBlock(blockData)
            }
            
            if (apartmentsData.success) {
                setApartments(apartmentsData.data)
            }
            
            if (statsData.success) {
                setStatistics(statsData.data)
            }
        } catch (error) {
            console.error('Error fetching block data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-500/80 text-white'
            case 'likely_sold':
                return 'bg-red-500/80 text-white'
            case 'reserved':
                return 'bg-yellow-500/80 text-white'
            case 'sold':
                return 'bg-gray-500/80 text-white'
            default:
                return 'bg-gray-400/80 text-white'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'available':
                return 'Available'
            case 'likely_sold':
                return 'Likely Sold'
            case 'reserved':
                return 'Reserved'
            case 'sold':
                return 'Sold'
            default:
                return status || 'Unknown'
        }
    }

    if (loading) {
        return (
            <div className="relative">
                <Header />
                <div className="pt-24 flex items-center justify-center h-screen">
                    <div className="text-xl">Loading block details...</div>
                </div>
            </div>
        )
    }

    if (!building || !block) {
        return (
            <div className="relative">
                <Header />
                <div className="pt-24 flex items-center justify-center h-screen">
                    <div className="text-xl text-red-600">Block not found</div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-gray-50">
            <Header />
            
            <div className="pt-24 px-4 pb-8">
                {/* Back button and header */}
                <div className="max-w-7xl mx-auto mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <BackButton onClick={() => router.push(`/krtsanisi/building/${buildingId}`)} />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {building.building_name} - {block.block_name}
                        </h1>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{block.total_apartments || 0}</div>
                                <div className="text-sm text-gray-600">Total Apartments</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">{block.available_apartments || 0}</div>
                                <div className="text-sm text-gray-600">Available</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-600">{block.likely_sold_apartments || 0}</div>
                                <div className="text-sm text-gray-600">Likely Sold</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-600">Block {block.block_number}</div>
                                <div className="text-sm text-gray-600">Block Number</div>
                            </div>
                        </div>
                    </div>

                    {/* Status filter */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
                            }`}
                        >
                            All ({apartments.length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('available')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                statusFilter === 'available' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'
                            }`}
                        >
                            Available ({apartments.filter(a => a.status === 'available').length})
                        </button>
                        <button
                            onClick={() => setStatusFilter('likely_sold')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                statusFilter === 'likely_sold' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border'
                            }`}
                        >
                            Likely Sold ({apartments.filter(a => a.status === 'likely_sold').length})
                        </button>
                    </div>

                    {/* Apartments grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredApartments.map((apartment) => (
                            <div
                                key={apartment.id}
                                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Apt {apartment.apartment_number || apartment.apartment_id}
                                        </h3>
                                        <div className="text-sm text-gray-600">ID: {apartment.apartment_id}</div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apartment.status)}`}>
                                        {getStatusText(apartment.status)}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                    {apartment.total_area && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Area:</span>
                                            <span className="font-medium">{apartment.total_area}m²</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`font-medium ${
                                            apartment.status === 'available' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {getStatusText(apartment.status)}
                                        </span>
                                    </div>
                                </div>
                                
                                {apartment.url && (
                                    <div className="mt-3 pt-3 border-t">
                                        <a
                                            href={apartment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            View Details →
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredApartments.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500">No apartments found with the selected filter.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default KrtsanisiBlockPage