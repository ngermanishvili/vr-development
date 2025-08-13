"use client"
import React from 'react'
import Image from 'next/image'

const AboutPartners = () => {
    const partners = [
        {
            name: "TBC Bank",
            logo: "/about/logo/TBC-LOGO.png"
        },
        {
            name: "Marriott",
            logo: "/about/logo/MARIOT-LOGO.png"
        }
    ];

    // Duplicate partners to fill 6 slots (3x2 grid)
    const allPartners = [...partners, ...partners, ...partners];

    return (
        <div className="bg-[#ECECEC] py-16 px-8">
            <div className="max-w-7xl mx-auto">
                {/* PARTNERS Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-light text-black tracking-[0.2em]">PARTNERS</h2>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPartners.map((partner, index) => (
                        <div key={index} className="border border-black bg-white p-2 flex items-center justify-center h-[100px] rounded-md">
                            <div className="w-full  h-full flex items-center justify-center rounded-md">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={150}
                                    height={150}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutPartners