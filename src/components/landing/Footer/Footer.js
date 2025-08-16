import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-8 py-12">
            <div className="flex justify-between">
                <div className="text-2xl font-bold tracking-wider mb-8">
                    VR
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm">f</span>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm">ig</span>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm">x</span>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-sm">yt</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-12 mt-8">
                <div className="space-y-4">
                    <div className="text-white">Home</div>
                    <div className="text-white">Projects</div>
                    <div className="text-white">Opportunities</div>
                    <div className="text-white">Rental</div>
                    <div className="text-white">VR Club Card Partners</div>
                    <div className="text-white">Investment</div>
                </div>

                <div className="space-y-4">
                    <div className="text-white">About</div>
                    <div className="text-white">Brand resources</div>
                    <div className="text-white">Contact</div>
                </div>

                <div>
                    <div className="text-white">Download Presentation</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;