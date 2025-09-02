export default function Sidebar({ isCollapsed, isMobile }) {
    if (isMobile) {
        return (
            <div className="bg-white shadow p-4 font-sans">
                {/* Mobile content - always visible, no scroll */}
                <>
                    {/* Back Button */}
                    <div className="flex justify-between items-center mb-4">
                        <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f] uppercase text-xs">
                            Back
                        </button>
                        <button className="border border-gray-300 w-8 h-8 flex items-center justify-center">
                            <span className="text-lg">←</span>
                        </button>
                    </div>

                    {/* Building */}
                    <div className="text-center mb-4">
                        <h2 className="font-semibold italic text-base mb-2">Building</h2>
                        <div className="flex justify-center gap-2">
                            <button className="bg-gray-700 text-white px-3 py-1 text-sm">A</button>
                            <button className="border border-gray-400 px-3 py-1 text-sm">B</button>
                            <button className="border border-gray-400 px-3 py-1 text-sm">C</button>
                            <button className="border border-gray-400 px-3 py-1 text-sm">D</button>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">APARTMENT</button>
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">COMMERCIAL</button>
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">PARKING</button>
                        <button className="border border-[#cfa84f] px-3 py-1 text-[#cfa84f] text-xs">RENT</button>
                    </div>

                    {/* Number of Rooms */}
                    <div className="text-center mb-4">
                        <h2 className="text-[#cfa84f] italic font-semibold mb-2 text-sm">Number Of Rooms</h2>
                        <div className="flex justify-center gap-2">
                            <button className="border border-gray-400 px-3 py-1 text-xs">ALL</button>
                            <button className="border border-gray-400 px-3 py-1 text-xs">STUDIO</button>
                            <button className="border border-gray-400 px-3 py-1 text-xs">1</button>
                            <button className="border border-gray-400 px-3 py-1 text-xs">2</button>
                            <button className="border border-gray-400 px-3 py-1 text-xs">3</button>
                        </div>
                    </div>

                    {/* Total Area */}
                    <div className="text-center mb-4">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Total Area</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>From 35 m²</span>
                            <span>To 200 m²</span>
                        </div>
                        <input type="range" className="w-full accent-[#cfa84f]" />
                        <button className="mt-2 border border-gray-400 px-3 py-1 text-xs">Exact Number</button>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-4">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Price</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>From 100 m²</span>
                            <span>To 2000 m²</span>
                        </div>
                        <input type="range" className="w-full accent-[#cfa84f]" />
                        <button className="mt-2 border border-gray-400 px-3 py-1 text-xs">Exact Price</button>
                    </div>

                    {/* Floor */}
                    <div className="text-center mb-4">
                        <h2 className="italic text-gray-400 mb-2 text-sm">Floor</h2>
                        <div className="flex justify-between text-[#cfa84f] text-xs mb-2">
                            <span>From 1</span>
                            <span>To 20</span>
                        </div>
                        <input type="range" className="w-full accent-[#cfa84f]" />
                        <button className="mt-2 border border-gray-400 px-3 py-1 text-xs">Exact Number</button>
                    </div>

                    {/* Additional Parameters */}
                    <div className="text-left mb-4">
                        <h2 className="font-semibold mb-2 text-sm">Additional Parameters</h2>
                        <p className="text-xs">
                            Bathroom with window | Master bedroom | <span className="text-[#cfa84f]">Terrace</span>
                            <br />
                            More than 2 windows | Windows on 3 sides | Street view
                        </p>
                    </div>

                    {/* Choose Apartment Button */}
                    <button className="w-full bg-[#cfa84f] text-white py-2 uppercase font-semibold text-sm">
                        Choose an apartment
                    </button>
                </>
            </div>
        );
    }

    // Desktop version
    return (
        <div className={`${isCollapsed ? 'w-0 overflow-hidden' : 'w-full'} h-screen bg-white shadow transition-all duration-300 ease-in-out ${isCollapsed ? 'p-0' : 'p-6'} font-sans overflow-y-auto`}>
            {/* Back Button */}
            <div className="flex justify-between items-center mb-6">
                <button className="border border-[#cfa84f] px-6 py-2 text-[#cfa84f] uppercase text-sm">
                    Back
                </button>
                <button className="border border-gray-300 w-10 h-10 flex items-center justify-center">
                    <span className="text-xl">←</span>
                </button>
            </div>

            {/* Building */}
            <div className="text-center mb-6">
                <h2 className="font-semibold italic text-lg mb-2">Building</h2>
                <div className="flex justify-center gap-4">
                    <button className="bg-gray-700 text-white px-4 py-2">A</button>
                    <button className="border border-gray-400 px-4 py-2">B</button>
                    <button className="border border-gray-400 px-4 py-2">C</button>
                    <button className="border border-gray-400 px-4 py-2">D</button>
                </div>
            </div>

            {/* Category */}
            <div className="flex justify-center gap-4 mb-6">
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]">APARTMENT</button>
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]">COMMERCIAL</button>
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]">PARKING</button>
                <button className="border border-[#cfa84f] px-4 py-2 text-[#cfa84f]">RENT</button>
            </div>

            {/* Number of Rooms */}
            <div className="text-center mb-6">
                <h2 className="text-[#cfa84f] italic font-semibold mb-2">Number Of Rooms</h2>
                <div className="flex justify-center gap-4">
                    <button className="border border-gray-400 px-4 py-2">ALL</button>
                    <button className="border border-gray-400 px-4 py-2">STUDIO</button>
                    <button className="border border-gray-400 px-4 py-2">1</button>
                    <button className="border border-gray-400 px-4 py-2">2</button>
                    <button className="border border-gray-400 px-4 py-2">3</button>
                </div>
            </div>

            {/* Total Area */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Total Area</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From 35 m²</span>
                    <span>To 200 m²</span>
                </div>
                <input type="range" className="w-full accent-[#cfa84f]" />
                <button className="mt-2 border border-gray-400 px-4 py-1">Exact Numer</button>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Price</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From 100 m²</span>
                    <span>To 2000 m²</span>
                </div>
                <input type="range" className="w-full accent-[#cfa84f]" />
                <button className="mt-2 border border-gray-400 px-4 py-1">Exact Price</button>
            </div>

            {/* Floor */}
            <div className="text-center mb-6">
                <h2 className="italic text-gray-400 mb-2">Floor</h2>
                <div className="flex justify-between text-[#cfa84f] text-sm mb-2">
                    <span>From 1</span>
                    <span>To 20</span>
                </div>
                <input type="range" className="w-full accent-[#cfa84f]" />
                <button className="mt-2 border border-gray-400 px-4 py-1">Exact Numer</button>
            </div>

            {/* Additional Parameters */}
            <div className="text-left mb-6">
                <h2 className="font-semibold mb-2">Additional Parameters</h2>
                <p className="text-sm">
                    Bathroom with window | Master bedroom | <span className="text-[#cfa84f]">Terrace</span>
                    <br />
                    More than 2 windows | Windows on 3 sides | Street view
                </p>
            </div>

            {/* Choose Apartment Button */}
            <button className="w-full bg-[#cfa84f] text-white py-3 uppercase font-semibold">
                Choose an apartment
            </button>
        </div>
    );
}
