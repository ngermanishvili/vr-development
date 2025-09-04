'use client'
import React from 'react'

const ApartmentTooltip = ({ apartment, blockCode, x = 0, y = 0, visible = false }) => {
    if (!visible || !apartment) return null

    return (
        <div
            className="fixed z-50 pointer-events-none"
            style={{
                left: x + 10, // offset 10px right from cursor
                top: y - 10,  // offset 10px up from cursor
                transform: 'translate(0, -100%)', // position above cursor
            }}
        >
            <div className="bg-white border border-gray-400 rounded shadow-lg p-3 w-auto min-w-[120px]">
                {/* BLOCK header */}
                <div className="text-center mb-2">
                    <div className="text-xs text-[#B8860B] font-semibold uppercase tracking-wide mb-1">BLOCK</div>
                    <div className="font-bold text-[28px] text-[#B8860B] leading-none">{blockCode}</div>
                </div>
                
                {/* Area, Status and Apt */}
                <div className="text-xs space-y-1">
                    <div><span className="text-[#B8860B]">Area</span> - <span className="text-black">{apartment.total_area} sq m</span></div>
                    <div><span className="text-[#B8860B]">Status</span> - <span className="text-black">{apartment.status}</span></div>
                    <div><span className="text-[#B8860B]">Apt</span> - <span className="text-black">#{apartment.apartment_number}</span></div>
                </div>
            </div>
        </div>
    )
}

export default ApartmentTooltip