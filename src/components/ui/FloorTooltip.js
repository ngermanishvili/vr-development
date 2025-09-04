'use client'
import React from 'react'

const FloorTooltip = ({ floorNumber, availableCount, x = 0, y = 0, visible = false }) => {
    if (!visible) return null

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
                {/* FLOOR header */}
                <div className="text-center mb-2">
                    <div className="text-xs text-[#B8860B] font-semibold uppercase tracking-wide mb-1">FLOOR</div>
                    <div className="font-bold text-[28px] text-[#B8860B] leading-none">{floorNumber}</div>
                </div>
                
                {/* Available count */}
                <div className="text-xs">
                    <div><span className="text-[#B8860B]">Available</span> - <span className="text-black">{availableCount}</span></div>
                </div>
            </div>
        </div>
    )
}

export default FloorTooltip