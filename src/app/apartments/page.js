'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/landing/Header/Header'

const ApartmentsPage = () => {
    const [apartments, setApartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)
    const searchParams = useSearchParams()

    useEffect(() => {
        fetchApartments()
    }, [searchParams])

    const fetchApartments = async () => {
        try {
            setLoading(true)
            
            // Build query parameters from URL search params
            const queryParams = new URLSearchParams()
            
            // Get all filter parameters
            const block = searchParams.get('block')
            const apartmentType = searchParams.get('apartmentType')
            const minArea = searchParams.get('minArea')
            const maxArea = searchParams.get('maxArea')
            const floor = searchParams.get('floor')
            
            if (block && block !== 'ALL') queryParams.append('block_code', block)
            if (apartmentType && apartmentType !== 'ALL') queryParams.append('apartment_type', apartmentType)
            if (minArea) queryParams.append('min_area', minArea)
            if (maxArea) queryParams.append('max_area', maxArea)
            if (floor && floor !== 'ALL') queryParams.append('floor', floor)
            
            // Add pagination
            queryParams.append('limit', '50')
            queryParams.append('offset', '0')

            const response = await fetch(`/api/apartments?${queryParams.toString()}`)
            const data = await response.json()
            
            if (data.success) {
                setApartments(data.data)
                setTotalResults(data.pagination.total)
            }
        } catch (error) {
            console.error('Error fetching apartments:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'თავისუფალია':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'გაყიდული':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'დაჯავშნილია':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'ნოშიკოს ჯავშანზეა':
                return 'bg-orange-100 text-orange-800 border-orange-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getApartmentTypeDisplay = (type) => {
        switch (type) {
            case 'სტუდიო':
                return 'Studio'
            case '1 საძინ':
                return '1 Bedroom'
            case '2 საძინ':
                return '2 Bedroom'
            case '5 საძინ':
                return '5 Bedroom'
            default:
                return type
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading apartments...</div>
            </div>
        )
    }

    return (
        <div className="relative">
            <Header />
            <div className="pt-24 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">
                            Available Apartments
                        </h1>
                        <div className="text-lg text-gray-600">
                            {totalResults} results found
                        </div>
                    </div>

                    {/* Filter Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <h3 className="font-semibold mb-2">Active Filters:</h3>
                        <div className="flex flex-wrap gap-2">
                            {searchParams.get('block') && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    Block: {searchParams.get('block')}
                                </span>
                            )}
                            {searchParams.get('apartmentType') && searchParams.get('apartmentType') !== 'ALL' && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    Type: {getApartmentTypeDisplay(searchParams.get('apartmentType'))}
                                </span>
                            )}
                            {searchParams.get('maxArea') && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                    Max Area: {searchParams.get('maxArea')} m²
                                </span>
                            )}
                            {searchParams.get('floor') && searchParams.get('floor') !== 'ALL' && (
                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                    Floor: {searchParams.get('floor')}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Apartments Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {apartments.map((apartment) => (
                            <div key={apartment.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                {/* Header */}
                                <div className="bg-[#cfa84f] text-white p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Apt {apartment.apartment_number}
                                            </h3>
                                            <p className="text-sm opacity-90">
                                                Block {apartment.block_code} • Floor {apartment.floor}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(apartment.status)}`}>
                                            {apartment.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Type:</span>
                                            <span className="font-semibold">{getApartmentTypeDisplay(apartment.apartment_type)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Area:</span>
                                            <span className="font-semibold">{apartment.total_area} m²</span>
                                        </div>
                                        {apartment.living_area && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Living Area:</span>
                                                <span className="font-semibold">{apartment.living_area} m²</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">View:</span>
                                            <span className="font-semibold">{apartment.view_type}</span>
                                        </div>
                                        {apartment.terrace_area && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Terrace:</span>
                                                <span className="font-semibold">{apartment.terrace_area} m²</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 space-y-2">
                                        {apartment.vr_tour_link && (
                                            <a 
                                                href={apartment.vr_tour_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center block transition-colors"
                                            >
                                                View VR Tour
                                            </a>
                                        )}
                                        <button className="w-full bg-[#cfa84f] hover:bg-[#b8863c] text-white py-2 px-4 rounded transition-colors">
                                            More Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {apartments.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <h3 className="text-xl text-gray-600 mb-4">No apartments found</h3>
                            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ApartmentsPage