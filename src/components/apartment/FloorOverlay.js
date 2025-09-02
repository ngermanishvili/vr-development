'use client'
import React, { useState, useEffect } from 'react'

const FloorOverlay = ({ selectedBlock }) => {
    const [floors, setFloors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (selectedBlock) {
            fetchFloors()
        }
    }, [selectedBlock])

    const fetchFloors = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/floors?block_code=${selectedBlock}`)
            const data = await response.json()
            if (data.success) {
                setFloors(data.data)
            }
        } catch (error) {
            console.error('Error fetching floors:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!selectedBlock || loading || floors.length === 0) {
        return null
    }

    return (
        <div className="absolute inset-0 w-full h-full">
            <svg
                className="w-full h-full"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
                style={{ pointerEvents: 'auto' }}
            >
                {floors.map((floor) => (
                    <polygon
                        key={floor.id}
                        points={floor.coords}
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth="2"
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={(e) => {
                            e.target.style.fill = '#CA9B43'
                            e.target.style.fillOpacity = '0.7'
                            console.log(`Hovering floor ${floor.floor_number}`)
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.fill = 'transparent'
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log(`Navigating to floor ${floor.floor_number}`)
                            window.location.href = `/floor/${selectedBlock}/${floor.floor_number}`
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}

export default FloorOverlay