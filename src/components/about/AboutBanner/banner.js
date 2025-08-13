import React from 'react'
import Image from 'next/image';

const AboutBanner = () => {
    return (
        <div className="md:py-30 py-20  bg-white flex items-center justify-center p-8">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left Section - Company Title */}
                <div className="lg:col-span-1 flex justify-start">
                    <h1 className="md:text-4xl text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
                        REAL ESTATE
                        <br />
                        DEVELOPMENT
                        <br />
                        COMPANY
                    </h1>
                </div>

                {/* Center Section - Building Image */}
                <div className="lg:col-span-1 flex justify-center">
                    <div className="relative w-full max-w-md aspect-[3/4]">
                        <Image
                            src="/landing/hero/landing_banner.png"
                            alt="Modern luxury residential building"
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Right Section - Company Description */}
                <div className="lg:col-span-1 flex flex-col justify-center space-y-8">
                    <div className="text-center lg:text-left">
                        <p className="text-lg italic text-gray-700 leading-relaxed">
                            <span className="font-semibold">VR HOLDING</span> is one of the first real
                            <br />
                            estate development companies in the
                            <br />
                            Georgian market to introduce the highest
                            <br />
                            standard within the construction industry.
                        </p>
                    </div>

                    {/* Chat Contact Icon */}
                    <div className="flex justify-center md:mt-14">
                        <button
                            className="z-50"
                            style={{
                                width: '170px',
                                height: '132px',
                                backgroundColor: '#CDA34B',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none'
                            }}
                        >
                            <img
                                src="/landing/hero/chaticon.svg"
                                alt="Chat"
                                style={{ width: '60px', height: '50px' }}
                                className="object-contain"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutBanner