import React from 'react'
import { MessageCircle } from 'lucide-react'

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

            <div className="relative z-10 text-center text-white max-w-4xl px-6">
                <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-wider">VR HOLDING</h1>
                <p className="text-2xl md:text-3xl font-light italic mb-12 text-yellow-300">Live Life to the Fullest</p>
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

            {/* Chat Button */}
            <button className="fixed bottom-6 right-6 z-50 bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg shadow-lg transition-colors">
                <MessageCircle className="w-6 h-6" />
            </button>
        </section>
    )
}

export default LandingHero