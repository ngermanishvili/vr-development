'use client'
import React, { useState } from 'react'
import ProjectImage from '@/components/apartment/project-image'
import Sidebar from '@/components/apartment/sidebar'
import Header from '@/components/landing/Header/Header'

const ApartmentChoose = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    return (
        <div className="relative">
            <Header />
            {/* Desktop Layout */}
            <div className="hidden md:flex pt-24 relative">
                <div className={`${isSidebarCollapsed ? 'w-0' : 'w-[35%]'} transition-all duration-300 ease-in-out`}>
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </div>
                <div className={`${isSidebarCollapsed ? 'w-full' : 'w-[65%]'} transition-all duration-300 ease-in-out`}>
                    <ProjectImage onImageClick={toggleSidebar} isFullscreen={isSidebarCollapsed} />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden pt-20">
                <ProjectImage onImageClick={() => {}} />
                <Sidebar isCollapsed={false} isMobile={true} />
            </div>
        </div>
    )
}

export default ApartmentChoose