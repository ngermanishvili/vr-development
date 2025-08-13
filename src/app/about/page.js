import AboutBanner from '@/components/about/AboutBanner/banner'
import AboutPriorities from '@/components/about/AboutPriorities/about-priorities'
import ProjectsAbout from '@/components/about/AboutProjects/AboutProject'
import AboutStatistic from '@/components/about/AboutStatistic/AboutStatistic'
import AboutPartners from '@/components/about/Partners/AboutPartners'
import AboutTeam from '@/components/about/Team/AboutTeam'
import ContactForm from '@/components/landing/ContactForm/ContactForm'
import React from 'react'

const AboutPage = () => {
    return (
        <div>
            <AboutBanner />
            <AboutStatistic />
            <AboutPriorities />
            <ProjectsAbout />
            <AboutTeam />
            <AboutPartners />
            <ContactForm />
        </div>
    )
}

export default AboutPage