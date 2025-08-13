import React from 'react'
import Image from 'next/image';

const AboutPriorities = () => {
    return (
        <>
            <div className="bg-white py-16 px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Priorities Header */}
                    <div className="text-center ">
                        <h2 className="text-4xl  font-light text-yellow-600 tracking-[0.2em] mb-12" style={{ fontFamily: 'Baskerville Display PT, serif', fontWeight: 'bold' }}>OUR PRIORITIES</h2>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="w-full h-px bg-black mb-8"></div>
                <div className="absolute top-0 right-0 transform -translate-y-full flex items-center space-x-12 md:mr-[18%] pr-8 -mt-4">
                    <span className="text-xl italic text-yellow-600 font-light bg-white px-2" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>ECOLOGY</span>
                    <span className="text-xl italic text-yellow-600 font-light bg-white px-2" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>SAFETY</span>
                    <span className="text-xl italic text-yellow-600 font-light bg-white px-2" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>QUALITY</span>
                </div>
            </div>
            <div className="bg-white px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left - Building Image */}
                        <div className="relative aspect-[4/5] w-full">
                            <Image
                                src="/landing/hero/landing_banner.png"
                                alt="Modern architectural building with distinctive design"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Right - Content Sections */}
                        <div className="space-y-12">
                            {/* Mission */}
                            <div>
                                <h3 className="text-2xl italic text-yellow-600 font-light mb-4" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>MISSION</h3>
                                <p className="text-gray-700 leading-relaxed text-sm italic" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>
                                    To introduce and implement innovative projects throughout Georgia, that contribute to the improvement of the quality of life. Furthermore, we aspire to pursue sustainable development practices promoting the preservation of the environment and economy of the country and the well-being of the population.
                                </p>
                            </div>

                            {/* Vision */}
                            <div>
                                <h3 className="text-2xl italic text-yellow-600 font-light mb-4" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>VISION</h3>
                                <p className="text-gray-700 leading-relaxed text-sm italic" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>
                                    Our vision is based on dual commitment: innovative development and ecological harmony. Ecology remains the most significant factor in all construction stages. Prior commencement of the project, existing territory is evaluated; efforts are made to preserve greenery at the highest level possible; natural and energy-efficient materials are used, and thus, we take care of the environment. We create places compatible with the modern living as well as the environmental protection.
                                </p>
                            </div>

                            {/* Creating a Comfortable */}
                            <div>
                                <h3 className="text-2xl italic text-yellow-600 font-light mb-4" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>CREATING A COMFORTABLE <br /> ENVIRONMENT</h3>
                                <p className="text-gray-700 leading-relaxed text-sm italic" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>
                                    From our perspective, home should be more than just a place to live; considering this idea, high importance is given to designing a comfortable environment separated from urban noise and polluted emissions. For that reason, we design projects covering diverse infrastructure and meeting the daily wishes of the customers. From modern fitness and spa centers to green outdoor areas, our projects are designed to upgrade the lifestyles of the customers.
                                </p>
                            </div>

                            {/* Professionalism */}
                            <div>
                                <h3 className="text-2xl italic text-yellow-600 font-light mb-4" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>PROFESSIONALISM</h3>
                                <p className="text-gray-700 leading-relaxed text-sm italic" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic' }}>
                                    Undertaken commitment encourages us to persistently monitor the construction quality and make every effort to refine construction standards. Within the framework of our projects, the monolithic construction technology is used and only the best construction and decorative materials are incorporated. VR Holding was the first to introduce a high standard within the field of construction and insofar, for 15 years, it has been successfully implementing large-scale projects throughout the territory of Georgia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPriorities