import React from 'react'


const ContactForm = () => {
    return (
        <section className="py-8 bg-gray-100">
            <div className=" mx-auto">
                <div className="flex flex-col lg:flex-row md:gap-50 px-4 ">
                    {/* Left Side - Contact Information - 20% */}
                    <div className="lg:w-1/5 space-y-16 bg-[#F0EFF0]">
                        {/* Location */}
                        <div className='p-4'>
                            <h3 className="text-3xl text-end font-light italic text-yellow-600 mb-8">Location</h3>
                            <div className="space-y-6 text-gray-700">
                                <p className="text-right">Merab Kostava str. 37/39</p>
                                <hr className="border-gray-300" />
                                <p className="text-right">Gr, Volski str. N7</p>
                                <hr className="border-gray-300" />
                                <p className="text-right">
                                    Yangzi Realty LLC 100 Riverside
                                    <br />
                                    Blvd Suite 28 E, New York, NY 10069
                                </p>
                            </div>
                        </div>

                        {/* Number */}
                        <div className='p-4'>
                            <h3 className="text-3xl text-end font-light italic text-yellow-600 mb-8">Number</h3>
                            <div className="space-y-6 text-gray-700">
                                <p className="text-right">+(995) 599 26 11 11</p>
                                <hr className="border-gray-300" />
                                <p className="text-right">+995 32 2 50 11 11</p>
                            </div>
                        </div>

                        {/* Mail */}
                        <div className="p-4">
                            <h3 className="text-3xl  text-end  font-light italic text-yellow-600 mb-8">Mail</h3>
                            <div className="space-y-6 text-gray-700">
                                <p className="text-right">Sales@vr.ge</p>
                                <hr className="border-gray-300" />
                                <p className="text-right">Info@vr.ge</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form - 70% */}
                    <div className="flex-1">
                        <h2 className="text-3xl font-light text-center mb-12 text-yellow-600 tracking-wider">CONTACT</h2>

                        <form className="space-y-6">
                            {/* Toggle Buttons */}
                            <div className="flex gap-4 mb-8">
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-black text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors"
                                >
                                    For residence
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-3 border border-gray-400 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors"
                                >
                                    For investment
                                </button>
                            </div>

                            {/* Name Field */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name surname"
                                    className="w-full px-4 py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                                    required
                                />
                                <span className="text-red-500 text-sm ml-2">*</span>
                            </div>

                            {/* Phone and Mail Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full px-4 py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                                        required
                                    />
                                    <span className="text-red-500 text-sm ml-2">*</span>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Mail"
                                    className="w-full px-4 py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                                />
                            </div>

                            {/* Project and Property Type Dropdowns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select className="w-full px-4 py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-700">
                                    <option>Project</option>
                                    <option>VR Shekvetili Forest Resort</option>
                                    <option>VR Kvariani Resort Residence</option>
                                    <option>VR Vake Sky Tower</option>
                                </select>
                                <select className="w-full px-4 py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-700">
                                    <option>Property type</option>
                                    <option>Studio</option>
                                    <option>2 bedroom apartment</option>
                                    <option>3 bedroom apartment</option>
                                    <option>Penthouse</option>
                                </select>
                            </div>

                            {/* Message Field */}
                            <textarea
                                placeholder="Write a message"
                                rows={6}
                                className="w-full px-4 py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent resize-none"
                            ></textarea>

                            {/* Budget Section */}
                            <div>
                                <p className="text-gray-700 font-medium mb-4">Have you considered your approximate budget?</p>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-black text-white text-sm rounded-sm hover:bg-gray-800 transition-colors"
                                    >
                                        {"<100k"}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-black text-white text-sm rounded-sm hover:bg-gray-800 transition-colors"
                                    >
                                        100k - 250k
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-black text-white text-sm rounded-sm hover:bg-gray-800 transition-colors"
                                    >
                                        250k - 1m
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-black text-white text-sm rounded-sm hover:bg-gray-800 transition-colors"
                                    >
                                        1m - 5m
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-black text-white text-sm rounded-sm hover:bg-gray-800 transition-colors"
                                    >
                                        5m +
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 flex justify-center cursor-pointer">
                                <button
                                    type="submit"
                                    className="w-full md:w-[300px] cursor-pointer px-16 py-4 bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-medium rounded-sm transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm