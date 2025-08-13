"use client"
import React from 'react'
import Image from 'next/image'

const AboutTeam = () => {
    const teamMembers = [
        {
            name: "Noshrevan Namoradze",
            position: "Founder",
            image: "/about/team/namoradze-noshrevan.png"
        },
        {
            name: "Mananiko Namoradze",
            position: "Sales Director",
            image: "/about/team/namoradze-mananiko.png"
        },
        {
            name: "Giorgi Gigauri",
            position: "Financial Director",
            image: "/about/team/giorgi-gigauri.png"
        },

    ];

    return (
        <div className="bg-white py-16 px-8">
            <div className="max-w-7xl mx-auto">
                {/* TEAM Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-light text-[#BE9744] tracking-[0.2em]">TEAM</h2>
                </div>

                {/* Team Members Slider */}
                <div className="overflow-x-scroll"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitScrollbar: { display: 'none' }
                    }}>
                    <div className="flex space-x-6 pb-4 w-max">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="relative flex-shrink-0 md:w-[400px] md:h-[460px] w-[300px] h-[350px] overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={600}
                                    height={700}
                                    className="w-full h-full object-cover "
                                />
                                {/* Name and Position Overlay */}
                                <div className="absolute bottom-4 left-4 text-left">
                                    <h3 className="text-[#BE9744] font-bold mb-1" style={{ fontSize: '21px' }}>{member.name}</h3>
                                    <p className="text-white" style={{ fontSize: '18px' }}>{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutTeam