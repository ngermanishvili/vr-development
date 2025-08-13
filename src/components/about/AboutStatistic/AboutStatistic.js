import React from 'react'

const AboutStatistic = () => {
    return (
        <section className="py-8 px-6 bg-[#BE9645]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-light text-white mb-2" style={{ fontFamily: 'Baskerville Display PT, serif' }}>4B+</div>
                        <div className="text-sm text-white uppercase tracking-wider" style={{ fontFamily: 'Roboto, sans-serif' }}>INVESTED</div>
                    </div>
                    <div>
                        <div className="text-5xl font-light text-white mb-2" style={{ fontFamily: 'Baskerville Display PT, serif' }}>15</div>
                        <div className="text-sm text-white uppercase tracking-wider" style={{ fontFamily: 'Roboto, sans-serif' }}>YEARS OF EXPERIENCE</div>
                    </div>
                    <div>
                        <div className="text-5xl font-light text-white mb-2" style={{ fontFamily: 'Baskerville Display PT, serif' }}>14</div>
                        <div className="text-sm text-white uppercase tracking-wider" style={{ fontFamily: 'Roboto, sans-serif' }}>OFFICIAL REPRESENTATION <br /> IN DIFFERENTR COUNTRIES</div>
                    </div>
                    <div>
                        <div className="text-5xl font-light text-white mb-2" style={{ fontFamily: 'Baskerville Display PT, serif' }}>1000+</div>
                        <div className="text-sm text-white uppercase tracking-wider" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            CONTRACTORS

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutStatistic