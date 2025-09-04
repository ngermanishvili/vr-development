'use client'
import React, { useState, useEffect } from 'react'

const FloorOverlay = ({ selectedBlock, onTooltipChange }) => {
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

    const getViewBox = (block) => {
        const blockUpper = block?.toUpperCase()
        if (blockUpper === 'B2' || blockUpper === 'B1') {
            return "0 0 1920 970"
        } else if (blockUpper === 'C1') {
            return "0 0 1920 1080"
        }
        // Default viewBox
        return "0 0 1920 1080"
    }

    return (
        <div className="absolute inset-0 w-full h-full">
            <svg
                className="w-full h-full"
                viewBox={getViewBox(selectedBlock)}
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

                            // Show floor tooltip
                            if (onTooltipChange) {
                                onTooltipChange({
                                    visible: true,
                                    floorNumber: floor.floor_number,
                                    availableCount: Number(floor.available_count) || 0,
                                    x: e.clientX,
                                    y: e.clientY,
                                    type: 'floor'
                                })
                            }
                        }}
                        onMouseMove={(e) => {
                            // Update tooltip position
                            if (onTooltipChange) {
                                onTooltipChange({
                                    visible: true,
                                    floorNumber: floor.floor_number,
                                    availableCount: Number(floor.available_count) || 0,
                                    x: e.clientX,
                                    y: e.clientY,
                                    type: 'floor'
                                })
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.fill = 'transparent'

                            // Hide tooltip
                            if (onTooltipChange) {
                                onTooltipChange({
                                    visible: false,
                                    type: 'floor'
                                })
                            }
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