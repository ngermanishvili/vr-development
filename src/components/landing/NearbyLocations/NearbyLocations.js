"use client"
import React, { useState, useEffect } from 'react'

const NearbyLocations = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedPurpose, setSelectedPurpose] = useState('Purpose of purchase')

    const purposeOptions = ['Investment', 'Primary Residence', 'Vacation Home', 'Rental Property']

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        
        const handleClickOutside = (e) => {
            if (!e.target.closest('.custom-dropdown')) {
                setDropdownOpen(false)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        document.addEventListener('click', handleClickOutside)
        
        return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <>
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center text-2xl font-light text-amber-700 mb-12 tracking-wider" style={{ fontFamily: 'Baskerville, serif' }}>REQUEST A CALL</h2>

                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '16px',
                        maxWidth: '1000px',
                        margin: '0 auto',
                        alignItems: 'center'
                    }}>
                        <input
                            placeholder="Full name"
                            style={{
                                flex: 1,
                                width: isMobile ? '100%' : 'auto',
                                padding: '12px 16px',
                                border: '1px solid #000',
                                borderRadius: '6px',
                                fontSize: '18px',
                                fontFamily: 'Roboto, sans-serif',
                                background: '#fff',
                                outline: 'none'
                            }}
                        />
                        <input
                            placeholder="Phone number"
                            style={{
                                flex: 1,
                                width: isMobile ? '100%' : 'auto',
                                padding: '12px 16px',
                                border: '1px solid #000',
                                borderRadius: '6px',
                                fontSize: '18px',
                                fontFamily: 'Roboto, sans-serif',
                                background: '#fff',
                                outline: 'none'
                            }}
                        />
                        <div
                            className="custom-dropdown"
                            style={{
                                position: 'relative',
                                flex: 1,
                                width: isMobile ? '100%' : 'auto',
                                border: '1px solid #000',
                                borderRadius: '6px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                background: '#fff'
                            }}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div style={{
                                padding: '12px 16px',
                                fontSize: '18px',
                                fontFamily: 'Roboto, sans-serif',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span>{selectedPurpose}</span>
                                <svg
                                    width="12" height="8" viewBox="0 0 12 8" fill="none"
                                    style={{
                                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div
                                style={{
                                    position: 'absolute', 
                                    top: '100%', 
                                    left: 0, 
                                    right: 0,
                                    background: '#fff', 
                                    border: '1px solid #000', 
                                    borderTop: 'none',
                                    borderRadius: '0 0 6px 6px', 
                                    display: dropdownOpen ? 'block' : 'none',
                                    zIndex: 1000, 
                                    maxHeight: '200px', 
                                    overflowY: 'auto'
                                }}
                            >
                                {purposeOptions.map((option, index) => (
                                    <div
                                        key={option}
                                        style={{
                                            padding: '12px 16px',
                                            borderBottom: index < purposeOptions.length - 1 ? '1px solid #888' : 'none',
                                            cursor: 'pointer',
                                            fontSize: '18px',
                                            fontFamily: 'Roboto, sans-serif',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedPurpose(option)
                                            setDropdownOpen(false)
                                        }}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button style={{
                            background: '#BE9645',
                            color: 'white',
                            border: 'none',
                            padding: '12px 32px',
                            borderRadius: '6px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            maxWidth: '150px',
                            width: isMobile ? '100%' : 'auto',
                            marginRight: isMobile ? '0' : '40px',
                            transition: 'all 0.3s'
                        }}
                            onMouseOver={(e) => e.target.style.background = '#a6823a'}
                            onMouseOut={(e) => e.target.style.background = '#BE9645'}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </section>

            {/* <section className=" px-4">
                <div className="max-w-7xl mx-auto">

                    <div className="relative mb-16">
                        <div className="relative  rounded-lg p-8 mx-auto max-w-4xl">
                            <Image
                                src="/landing/map/geo-map.png"
                                alt="Locations map"
                                width={1900}
                                height={1080}
                                className="w-full h-auto rounded"
                                quality={100}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                        <div className="lg:w-1/3">
                            <div className="relative">
                                <Image
                                    src="/modern-residential-building.png"
                                    alt="Modern residential building"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                            <h3 className="mt-4 text-xl font-light text-gray-800">
                                Nearby
                                <br />
                                <em className="text-amber-700">Locations</em>
                            </h3>
                        </div>

                        <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <div className="text-gray-700">
                                    <span className="font-medium">1.</span> Paragraph Resort & Spa
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">2.</span> Black Sea Arena
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">3.</span> Dendrological Park
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">4.</span> Tsitsinatela Amusement Park
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">5.</span> Musicians Park
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-gray-700">
                                    <span className="font-medium">1.</span> Paragraph Resort & Spa
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">2.</span> Black Sea Arena
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">3.</span> Dendrological Park
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">4.</span> Tsitsinatela Amusement Park
                                </div>
                                <div className="text-gray-700">
                                    <span className="font-medium">5.</span> Musicians Park
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default NearbyLocations