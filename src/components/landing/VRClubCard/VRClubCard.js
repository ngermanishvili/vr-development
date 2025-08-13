"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const VRClubCard = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <section className="w-full bg-black h-[400px] relative flex flex-col items-center justify-start pt-10 overflow-hidden">
            <h2 className={`text-yellow-600 font-bold tracking-widest mb-5 text-center ${isMobile ? 'text-2xl' : 'text-5xl'}`} style={{ fontFamily: 'Baskerville, serif' }}>
                VR CLUB CARD
            </h2>

            <div className={`text-white text-center leading-relaxed mb-10 px-5 ${isMobile ? 'text-sm' : 'text-base'}`} style={{ fontFamily: 'Roboto, sans-serif' }}>
                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    <br />lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
            </div>

            <div className={`absolute shadow-2xl ${isMobile ? 'w-[280px] h-[280px] -bottom-32' : 'w-[600px] h-[600px] -bottom-68'}`}>
                <Image
                    src="/landing/card/card.png"
                    alt="VR Club Card"
                    fill
                    className="object-contain"
                />
            </div>
        </section>
    )
}

export default VRClubCard