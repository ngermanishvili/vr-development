"use client"
import React from 'react'

const BackButton = () => {
    return (
        <button
            onClick={() => window.history.back()}
            className="border border-black px-6 py-3 hover:bg-[#BE9645] hover:text-white hover:border-[#BE9645] transition-all duration-300"
            style={{ fontFamily: 'Roboto, sans-serif' }}
        >
            ← Back to Stories
        </button>
    )
}

export default BackButton
