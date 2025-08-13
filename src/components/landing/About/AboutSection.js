"use client"
import React from 'react'


const AboutLanding = () => {
    return (
        <section className="py-8 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-light mb-8 text-[#BE9744] tracking-wider" style={{ fontFamily: 'Baskerville Display PT, serif' }}>ABOUT VR HOLDING</h2>
                <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Baskerville, serif' }}>
                    One of the first real estate development companies in the Georgian market is extending the highest standard
                    within the construction industry. In 2019 businessman Nikoloz Namoradze laid foundation to the company and
                    throughout a few short implementing years every project became a success.
                </p>
                <button
                    style={{
                        border: '1px solid #000',
                        background: 'transparent',
                        color: '#000',
                        padding: '8px 32px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '16px'
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
                    READ MORE
                </button>
            </div>
        </section>

    )
}

export default AboutLanding