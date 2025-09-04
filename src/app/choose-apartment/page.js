'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProjectImage from '@/components/apartment/project-image'
import Sidebar from '@/components/apartment/sidebar'
import Header from '@/components/landing/Header/Header'
import ApartmentTooltip from '@/components/ui/ApartmentTooltip'
import FloorTooltip from '@/components/ui/FloorTooltip'

const ApartmentChoose = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [selectedBlock, setSelectedBlock] = useState(null)
    const searchParams = useSearchParams()
    
    // Tooltip states
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
    
    // Tooltip change handler
    const handleTooltipChange = (data) => {
        if (data.type === 'floor') {
            setFloorTooltipData({
                visible: data.visible,
                floorNumber: data.floorNumber || null,
                availableCount: data.availableCount || 0,
                x: data.x || 0,
                y: data.y || 0
            })
        }
    }

    useEffect(() => {
        const block = searchParams.get('block')
        console.log('Block from URL:', block) // Debug
        if (block) {
            setSelectedBlock(block)
        }
    }, [searchParams])

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    return (
        <div className="relative">
            <Header />
            {/* Desktop Layout */}
            <div className="hidden md:flex pt-24 relative">
                <div className={`${isSidebarCollapsed ? 'w-0' : 'w-[25%]'} transition-all duration-300 ease-in-out`}>
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </div>
                <div className={`${isSidebarCollapsed ? 'w-full' : 'w-[75%]'} transition-all duration-300 ease-in-out`}>
                    <ProjectImage 
                        onImageClick={toggleSidebar} 
                        isFullscreen={isSidebarCollapsed} 
                        selectedBlock={selectedBlock}
                        onTooltipChange={handleTooltipChange}
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden pt-20">
                <ProjectImage 
                    onImageClick={() => { }} 
                    selectedBlock={selectedBlock}
                    onTooltipChange={handleTooltipChange}
                />
                <Sidebar isCollapsed={false} isMobile={true} />
            </div>
            
            {/* Floor Tooltip */}
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

export default ApartmentChoose