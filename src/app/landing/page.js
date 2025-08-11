import Image from "next/image"

import { Menu, MessageCircle } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 text-white">
                <div className="flex items-center space-x-8">
                    <button className="border border-white/30 px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                        HOUSE DEVELOPMENT
                    </button>
                    <button className="text-sm hover:text-yellow-300 transition-colors">JOBS</button>
                    <button className="text-sm hover:text-yellow-300 transition-colors">CONTACT</button>
                </div>

                <div className="text-2xl font-bold tracking-wider">VR</div>

                <div className="flex items-center space-x-4">
                    <button className="text-sm hover:text-yellow-300 transition-colors">ENG</button>
                    <Menu className="w-6 h-6" />
                </div>
            </nav>

            {/* Hero Section */}
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

                    <button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 bg-transparent"
                    >
                        DOWNLOAD PRESENTATION
                    </button>
                </div>

                {/* Chat Button */}
                <button className="fixed bottom-6 right-6 z-50 bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg shadow-lg transition-colors">
                    <MessageCircle className="w-6 h-6" />
                </button>
            </section>

            {/* About Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-light mb-8 text-yellow-600 tracking-wider">ABOUT VR HOLDING</h2>
                    <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto mb-8">
                        One of the first real estate development companies in the Georgian market is extending the highest standard
                        within the construction industry. In 2019 businessman Nikoloz Namoradze laid foundation to the company and
                        throughout a few short implementing years every project became a success.
                    </p>
                    <button
                        variant="outline"
                        className="border-1 px-8 py-2  transition-all duration-300 bg-transparent"
                    >
                        READ MORE
                    </button>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-light text-yellow-600 mb-2">15</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider">YEARS OF EXPERIENCE</div>
                        </div>
                        <div>
                            <div className="text-5xl font-light text-yellow-600 mb-2">1000+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider">CONTRACTORS</div>
                        </div>
                        <div>
                            <div className="text-5xl font-light text-yellow-600 mb-2">300+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider">PARTNERSHIPS</div>
                        </div>
                        <div>
                            <div className="text-5xl font-light text-yellow-600 mb-2">15</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider">
                                OFFICIAL REPRESENTATIONS
                                <br />
                                IN DIFFERENT COUNTRIES
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-light text-center mb-16 text-yellow-600 tracking-wider">PROJECTS</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* VR Shekvetili Forest Resort */}
                        <div className="group overflow-hidden border-0 shadow-lg">
                            <div className="relative h-80">
                                <Image
                                    src="/landing/hero/landing_banner.png"
                                    alt="VR Shekvetili Forest Resort"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-light mb-2">VR Shekvetili Forest Resort</h3>
                                    <p className="text-sm opacity-90">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* VR Kvariani Resort Residence */}
                        <div className="group overflow-hidden border-0 shadow-lg">
                            <div className="relative h-80">
                                <Image
                                    src="/landing/hero/landing_banner.png"
                                    alt="VR Kvariani Resort Residence"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-light mb-2">VR Kvariani Resort Residence</h3>
                                </div>
                            </div>
                        </div>

                        {/* VR Vake Sky Tower */}
                        <div className="group overflow-hidden border-0 shadow-lg">
                            <div className="relative h-80">
                                <Image
                                    src="/landing/hero/landing_banner.png"
                                    alt="VR Vake Sky Tower"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-light mb-2">VR Vake Sky Tower</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
