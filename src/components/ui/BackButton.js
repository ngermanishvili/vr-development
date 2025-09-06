"use client"
import React from 'react'

const BackButton = ({ onClick, children = "← Back" }) => {
    const handleClick = onClick || (() => window.history.back());
    
    return (
        <button
            onClick={handleClick}
            className="border border-black px-6 py-3 hover:bg-[#BE9645] hover:text-white hover:border-[#BE9645] transition-all duration-300"
            style={{ fontFamily: 'Roboto, sans-serif' }}
        >
            {children}
        </button>
    )
}

export default BackButton
