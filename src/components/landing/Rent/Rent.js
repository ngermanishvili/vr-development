"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Rent = () => {
    const [dropdowns, setDropdowns] = useState({
        rent: { isOpen: false, selected: 'Rent' },
        location: { isOpen: false, selected: 'Location' },
        price: { isOpen: false, selected: 'Price' }
    })
    const [isMobile, setIsMobile] = useState(false)

    const dropdownData = {
        rent: ['Buy', 'Lease'],
        location: ['Shekvetili', 'Batumi', 'Tbilisi'],
        price: ['$500-1000', '$1000-2000', '$2000-3000', '$3000-4000', '$4000-5000', '$5000-7000', '$7000-10000', '$10000+']
    }

    const properties = [
        { title: 'Shekvetili Resort', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Batumi Apartment', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Tbilisi Penthouse', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Luxury Villa', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
    ]

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.custom-dropdown')) {
                setDropdowns(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: { ...prev[key], isOpen: false } }), {}))
            }
        }

        const handleResize = () => setIsMobile(window.innerWidth <= 768)

        handleResize()
        window.addEventListener('resize', handleResize)
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const toggleDropdown = (type) => {
        setDropdowns(prev => {
            const newState = Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: { ...prev[key], isOpen: false } }), {})
            newState[type] = { ...prev[type], isOpen: !prev[type].isOpen }
            return newState
        })
    }

    const selectOption = (type, option) => {
        setDropdowns(prev => ({ ...prev, [type]: { selected: option, isOpen: false } }))
    }

    const Dropdown = ({ type, options }) => (
        <div
            className="custom-dropdown"
            style={{
                position: 'relative',
                width: isMobile ? '100%' : '150px',
                minWidth: isMobile ? 'auto' : '150px',
                border: '1px solid #000',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                background: '#fff'
            }}
            onClick={() => toggleDropdown(type)}
        >
            <div style={{
                padding: '12px 16px',
                fontSize: isMobile ? '14px' : '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>{dropdowns[type].selected}</span>
                <svg
                    width="12" height="8" viewBox="0 0 12 8" fill="none"
                    style={{
                        transform: dropdowns[type].isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                    }}
                >
                    <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div
                style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: '#fff', border: '1px solid #000', borderTop: 'none',
                    borderRadius: '0 0 6px 6px', display: dropdowns[type].isOpen ? 'block' : 'none',
                    zIndex: 1000, maxHeight: '200px', overflowY: 'auto'
                }}
            >
                {options.map((option, index) => (
                    <div
                        key={option}
                        style={{
                            padding: '12px 16px',
                            borderBottom: index < options.length - 1 ? '1px solid #888' : 'none',
                            cursor: 'pointer',
                            fontSize: isMobile ? '14px' : '16px',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        onClick={(e) => {
                            e.stopPropagation()
                            selectOption(type, option)
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    )

    const PropertyCard = ({ property }) => (
        <div style={{
            minWidth: isMobile ? '280px' : '400px',
            width: isMobile ? '280px' : '400px',
            cursor: 'pointer'
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '280px' : '400px',
                overflow: 'hidden',
                borderRadius: '8px'
            }}>
                <Image
                    src="/landing/hero/landing_banner.png"
                    alt={property.title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div style={{ marginTop: '18px' }}>
                <h3 style={{
                    fontSize: isMobile ? '18px' : '24px',
                    fontWeight: '300',
                    marginBottom: '12px',
                    color: '#374151',
                    fontStyle: 'italic',
                    fontFamily: 'Baskerville Display PT, serif'
                }}>
                    {property.title}
                </h3>
                <p style={{
                    fontSize: isMobile ? '14px' : '16px',
                    color: '#6B7280',
                    lineHeight: '1.6',
                    margin: '0',
                    fontFamily: 'Roboto, sans-serif'
                }}>
                    {property.description}
                </p>
            </div>
        </div>
    )

    const HoverButton = ({ children, style = {} }) => (
        <button
            style={{
                border: '1px solid #000',
                background: 'transparent',
                color: '#000',
                padding: '8px 32px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                ...style
            }}
            onMouseOver={(e) => {
                e.target.style.background = '#000'
                e.target.style.color = '#fff'
            }}
            onMouseOut={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#000'
            }}
        >
            {children}
        </button>
    )

    return (
        <section className="py-8 px-6 bg-white">
            <div className="mx-auto">
                <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider" style={{ fontFamily: 'Baskerville, serif' }}>RENT</h2>

                {/* Search Filters */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '48px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '16px',
                        flex: 1,
                        width: isMobile ? '100%' : 'auto'
                    }}>
                        {Object.entries(dropdownData).map(([key, options]) => (
                            <Dropdown key={key} type={key} options={options} />
                        ))}
                    </div>
                    <HoverButton style={{
                        width: isMobile ? '100%' : 'auto',
                        minWidth: isMobile ? 'auto' : '150px',
                        padding: isMobile ? '12px 16px' : '8px 32px',
                        fontSize: isMobile ? '14px' : '16px'
                    }}>
                        SEARCH
                    </HoverButton>
                </div>

                {/* Rental Properties */}
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: '24px',
                    marginBottom: '48px',
                    paddingBottom: '10px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    <style jsx>{`
                        div::-webkit-scrollbar { display: none; }
                    `}</style>
                    {properties.map((property, index) => (
                        <PropertyCard key={index} property={property} />
                    ))}
                </div>

                <div className="text-center">
                    <HoverButton>LOAD MORE</HoverButton>
                </div>
            </div>
        </section>
    )
}

export default Rent