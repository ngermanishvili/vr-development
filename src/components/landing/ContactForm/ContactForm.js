"use client"
import React, { useState, useEffect } from 'react'

const ContactForm = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState('Property type')
    const [isMobile, setIsMobile] = useState(false)
    const [selectedPurpose, setSelectedPurpose] = useState('For residence')
    const [selectedBudget, setSelectedBudget] = useState(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.custom-dropdown')) {
                setIsDropdownOpen(false)
            }
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize() // Check on mount
        window.addEventListener('resize', handleResize)
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <section style={{ fontFamily: 'Arial, sans-serif', margin: 0, background: '#fff' }}>
            <div className="w-full h-px c bg-black"></div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 3fr',
                minHeight: '20vh'
            }}>
                {/* Left Side - Contact Information */}
                <div style={{
                    width: '100%',
                    background: '#f0eff0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: isMobile ? '20px 15px' : '50px 20px',
                    gap: isMobile ? '30px' : '60px'
                }}>
                    {/* Location */}
                    <div style={{
                        borderBottom: '1px solid #000',
                        paddingBottom: '30px',
                        marginLeft: isMobile ? '-15px' : '-20px',
                        marginRight: isMobile ? '-15px' : '-20px',
                        paddingLeft: isMobile ? '15px' : '20px',
                        paddingRight: isMobile ? '15px' : '20px'
                    }}>
                        <div style={{
                            fontSize: isMobile ? '24px' : '40px',
                            fontStyle: 'italic',
                            color: '#b48c4d',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            fontFamily: 'Baskerville, serif'
                        }}>
                            Location
                        </div>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">Merab Kostava str. 37/39</p>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">Gr, Volski str. N7</p>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">Yangzi Realty LLC 100 Riverside Blvd Suite 28 E, New York, NY 10069</p>
                    </div>

                    {/* Number */}
                    <div style={{
                        borderBottom: '1px solid #000',
                        paddingBottom: '30px',
                        marginLeft: isMobile ? '-15px' : '-20px',
                        marginRight: isMobile ? '-15px' : '-20px',
                        paddingLeft: isMobile ? '15px' : '20px',
                        paddingRight: isMobile ? '15px' : '20px'
                    }}>
                        <div style={{
                            fontSize: isMobile ? '24px' : '40px',
                            fontStyle: 'italic',
                            color: '#b48c4d',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            fontFamily: 'Baskerville, serif'
                        }}>
                            Number
                        </div>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">+(995) 599 26 11 11</p>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">+995 32 2 50 11 11</p>
                    </div>

                    {/* Mail */}
                    <div>
                        <div style={{
                            fontSize: isMobile ? '24px' : '40px',
                            fontStyle: 'italic',
                            color: '#b48c4d',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            fontFamily: 'Baskerville, serif'
                        }}>
                            Mail
                        </div>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">Sales@vr.ge</p>
                        <p style={{ margin: '4px 0', fontFamily: 'Roboto, sans-serif' }} className="text-black">Info@vr.ge</p>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div style={{
                    padding: isMobile ? '20px 15px' : '40px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div className='flex justify-center items-center mb-8'>


                        <h2 style={{
                            color: '#b48c4d',
                            fontSize: isMobile ? '24px' : '34px',
                            letterSpacing: '1px',
                            marginBottom: '20px',
                            fontFamily: 'Baskerville Display PT, serif'
                        }}>
                            CONTACT
                        </h2>
                    </div>

                    <form>
                        {/* Toggle Buttons */}
                        <div style={{
                            width: '350px',
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '20px',
                            flexWrap: isMobile ? 'wrap' : 'nowrap'
                        }}>
                            <button
                                type="button"
                                onClick={() => setSelectedPurpose('For residence')}
                                style={{
                                    padding: isMobile ? '6px 12px' : '18px 20px',
                                    border: '1px solid #000',
                                    background: selectedPurpose === 'For residence' ? '#000' : 'transparent',
                                    color: selectedPurpose === 'For residence' ? '#fff' : '#000',
                                    cursor: 'pointer',
                                    fontSize: isMobile ? '12px' : '14px',
                                    flex: isMobile ? '1' : 'auto',
                                    borderRadius: '12px'
                                }}
                            >
                                For residence
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedPurpose('For investment')}
                                style={{
                                    padding: isMobile ? '6px 12px' : '18px 20px',
                                    border: '1px solid #000',
                                    background: selectedPurpose === 'For investment' ? '#000' : 'transparent',
                                    color: selectedPurpose === 'For investment' ? '#fff' : '#000',
                                    cursor: 'pointer',
                                    fontSize: isMobile ? '12px' : '14px',
                                    flex: isMobile ? '1' : 'auto',
                                    borderRadius: '12px'
                                }}
                            >
                                For investment
                            </button>
                        </div>

                        {/* Name Field */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Name surname *"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    fontSize: '18px',
                                    fontFamily: 'Roboto, sans-serif',
                                    outline: 'none'
                                }}
                                required
                            />
                        </div>

                        {/* Phone and Mail Fields */}
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '10px',
                            flexDirection: isMobile ? 'column' : 'row'
                        }}>
                            <input
                                type="tel"
                                placeholder="Phone *"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    fontSize: '18px',
                                    fontFamily: 'Roboto, sans-serif',
                                    outline: 'none'
                                }}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Mail"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    fontSize: '18px',
                                    fontFamily: 'Roboto, sans-serif',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {/* Project and Property Type Fields */}
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '10px',
                            flexDirection: isMobile ? 'column' : 'row'
                        }}>
                            <input
                                type="text"
                                placeholder="Project"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    fontSize: '18px',
                                    fontFamily: 'Roboto, sans-serif',
                                    outline: 'none'
                                }}
                            />
                            <div
                                className="custom-dropdown"
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    border: '1px solid #000',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    background: '#fff'
                                }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div style={{ padding: '10px' }}>
                                    {selectedProperty}
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
                                        display: isDropdownOpen ? 'block' : 'none',
                                        zIndex: 1000
                                    }}
                                >
                                    {['Studio', '2 bedroom apartment', '3 bedroom apartment', 'Penthouse'].map((option, index) => (
                                        <div
                                            key={option}
                                            style={{
                                                padding: '10px',
                                                borderBottom: index < 3 ? '1px solid #888' : 'none'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedProperty(option)
                                                setIsDropdownOpen(false)
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Message Field */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <textarea
                                placeholder="Write a message"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    fontSize: '18px',
                                    fontFamily: 'Roboto, sans-serif',
                                    outline: 'none',
                                    resize: 'none',
                                    height: '100px'
                                }}
                            ></textarea>
                        </div>

                        {/* Budget Section */}
                        <div style={{ marginTop: '20px' }}>
                            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                                Have you considered your approximate budget?
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                flexWrap: 'wrap',
                                borderRadius: '8px',
                                justifyContent: isMobile ? 'center' : 'flex-start'
                            }}>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const budgetText = e.target.textContent;
                                        setSelectedBudget(selectedBudget === budgetText ? null : budgetText);
                                    }}
                                    style={{
                                        padding: isMobile ? '6px 12px' : '16px 16px',
                                        background: selectedBudget === '<100k' ? '#000' : 'transparent',
                                        color: selectedBudget === '<100k' ? '#fff' : '#000',
                                        border: '1px solid #000',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '12px' : '14px',
                                        borderRadius: '8px',
                                        width: isMobile ? 'auto' : '150px'
                                    }}
                                >
                                    {"<100k"}
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const budgetText = e.target.textContent;
                                        setSelectedBudget(selectedBudget === budgetText ? null : budgetText);
                                    }}
                                    style={{
                                        padding: isMobile ? '6px 12px' : '16px 16px',
                                        background: selectedBudget === '100k - 250k' ? '#000' : 'transparent',
                                        color: selectedBudget === '100k - 250k' ? '#fff' : '#000',
                                        border: '1px solid #000',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '12px' : '14px',
                                        borderRadius: '8px',
                                        width: isMobile ? 'auto' : '150px'
                                    }}
                                >
                                    100k - 250k
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const budgetText = e.target.textContent;
                                        setSelectedBudget(selectedBudget === budgetText ? null : budgetText);
                                    }}
                                    style={{
                                        padding: isMobile ? '6px 12px' : '16px 16px',
                                        background: selectedBudget === '250k - 1m' ? '#000' : 'transparent',
                                        color: selectedBudget === '250k - 1m' ? '#fff' : '#000',
                                        border: '1px solid #000',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '12px' : '14px',
                                        borderRadius: '8px',
                                        width: isMobile ? 'auto' : '150px'
                                    }}
                                >
                                    250k - 1m
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const budgetText = e.target.textContent;
                                        setSelectedBudget(selectedBudget === budgetText ? null : budgetText);
                                    }}
                                    style={{
                                        padding: isMobile ? '6px 12px' : '16px 16px',
                                        background: selectedBudget === '1m - 5m' ? '#000' : 'transparent',
                                        color: selectedBudget === '1m - 5m' ? '#fff' : '#000',
                                        border: '1px solid #000',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '12px' : '14px',
                                        borderRadius: '8px',
                                        width: isMobile ? 'auto' : '150px'
                                    }}
                                >
                                    1m - 5m
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const budgetText = e.target.textContent;
                                        setSelectedBudget(selectedBudget === budgetText ? null : budgetText);
                                    }}
                                    style={{
                                        padding: isMobile ? '6px 12px' : '16px 16px',
                                        background: selectedBudget === '5m +' ? '#000' : 'transparent',
                                        color: selectedBudget === '5m +' ? '#fff' : '#000',
                                        border: '1px solid #000',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '12px' : '14px',
                                        borderRadius: '8px',
                                        width: isMobile ? 'auto' : '150px'
                                    }}
                                >
                                    5m +
                                </button>
                            </div>
                        </div>

                        <div className='flex justify-center items-center mt-8  '>


                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    marginTop: '30px',
                                    background: '#b48c4d',
                                    color: '#fff',
                                    padding: '12px 40px',
                                    width: '100%',
                                    maxWidth: '250px',
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',

                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactForm