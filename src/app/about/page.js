import AboutBanner from '@/components/about/AboutBanner/banner'
import AboutPriorities from '@/components/about/AboutPriorities/about-priorities'
import ProjectsAbout from '@/components/about/AboutProjects/AboutProject'
import AboutStatistic from '@/components/about/AboutStatistic/AboutStatistic'
import AboutPartners from '@/components/about/Partners/AboutPartners'
import AboutTeam from '@/components/about/Team/AboutTeam'
import ContactForm from '@/components/landing/ContactForm/ContactForm'
import Header from '@/components/landing/Header/Header'
import Footer from '@/components/landing/Footer/Footer'
import React from 'react'

export const metadata = {
    title: "About VR Holding - Leading Real Estate Developer in Georgia",
    description: "Learn about VR Holding, founded by businessman Noshrevan Namoradze in 2019. Discover our mission, team, and commitment to delivering the highest standard in Georgian real estate development.",
    keywords: "VR Holding about, Noshrevan Namoradze, Georgian real estate company, real estate development Georgia, luxury property developer, VR Holding team, company history",
    openGraph: {
        title: "About VR Holding - Leading Real Estate Developer",
        description: "Founded in 2019 by Noshrevan Namoradze, VR Holding has become Georgia's premier real estate development company, setting the highest standards in construction and luxury living.",
        images: [
            {
                url: '/landing/hero/landing_banner.png',
                width: 1200,
                height: 630,
                alt: 'VR Holding Company - About Us',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "About VR Holding - Leading Real Estate Developer",
        description: "Meet the team behind Georgia's most prestigious real estate developments.",
    },
}

const AboutPage = () => {
    return (
        <div>
            <Header />
            <AboutBanner />
            <AboutStatistic />
            <AboutPriorities />
            <ProjectsAbout />
            <AboutTeam />
            <AboutPartners />
            <ContactForm />
            <Footer />
        </div>
    )
}

export default AboutPage