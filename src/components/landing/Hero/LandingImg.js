import React from 'react'

const LandingImg = () => {
    return (
        <section className="relative h-[700px] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/landing/hero/landing_banner.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
            </div>
        </section>
    )
}

export default LandingImg