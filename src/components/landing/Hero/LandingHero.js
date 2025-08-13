import React from 'react'

const LandingHero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/landing/hero/landing_banner.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="relative z-10 text-center text-[#CDA34B] max-w-4xl px-6">
                <h1 className="text-6xl md:text-7xl  mb-4 tracking-wider" style={{ fontFamily: 'Baskerville Display PT, serif' }}>VR HOLDING</h1>
                <p className="text-2xl md:text-7xl font-light  mb-8 text-white" style={{ fontFamily: 'Baskerville Display PT, serif' }}>Live Life to the Fullest</p>
                <div className='flex gap-4 justify-center'>
                    <button
                        variant="outline"
                        className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 bg-transparent"
                    >
                        EXPLORE
                    </button>
                    <button
                        variant="outline"
                        className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 bg-transparent"
                    >
                        DOWNLOAD PRESENTATION
                    </button>
                </div>

            </div>

            {/* Chat Button - Half embedded at hero section bottom */}
            <button
                className="absolute bottom-0 right-6 z-50 transform translate-y-1/2"
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
        </section>
    )
}

export default LandingHero