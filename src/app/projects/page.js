import React from "react";
import ProjectsHero from "@/components/projects/ProjectsHero/ProjectsHero";
import ProjectHighlights from "@/components/projects/ProjectHighlights/ProjectHighlights";
import ProjectPhaseOne from "@/components/projects/ProjectPhaseOne/ProjectPhaseOne";
import ProjectsGallery from "@/components/projects/ProjectsGallery/ProjectsGallery";
import WhyShekvetili from "@/components/projects/WhyShekvetili/WhyShekvetili";
import RequestCall from "@/components/projects/RequestCall/RequestCall";
import ProjectsBanner from "@/components/projects/ProjectsBanner/ProjectsBanner";
import AttractionsSection from "@/components/projects/AttractionsListSection/AttractionsListSection";
import ServiceSection from "@/components/projects/ServiceSection/ServiceSection";
import TermsOfSale from "@/components/projects/TermsOfSale/TermsOfSale";
import AdditionalInfrastructure from "@/components/projects/AdditionalInfrastructure/AdditionalInfrastructure";
import ContactForm from "@/components/landing/ContactForm/ContactForm";
import Header from "@/components/landing/Header/Header";
import Footer from "@/components/landing/Footer/Footer";

export const metadata = {
    title: "VR Holding Projects - Luxury Real Estate Developments in Georgia",
    description: "Explore VR Holding's prestigious real estate projects including VR Shekvetili Forest Beach resort, VR Krtsanisi Resort Residence, VR Vake Sky Tower, and other premium developments across Georgia.",
    keywords: "VR Holding projects, VR Shekvetili Forest Beach, VR Krtsanisi Resort, VR Vake Sky Tower, luxury projects Georgia, beachfront development, resort projects, premium real estate Georgia",
    openGraph: {
        title: "VR Holding Projects - Luxury Real Estate Developments",
        description: "Discover our portfolio of luxury real estate projects - from beachfront resorts to urban towers, each designed to the highest standards of quality and luxury.",
        images: [
            {
                url: '/shekvetili/big-banner.webp',
                width: 1200,
                height: 630,
                alt: 'VR Holding Luxury Projects Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "VR Holding Projects - Luxury Real Estate Developments",
        description: "Explore our portfolio of premium real estate developments across Georgia.",
    },
};
const ProjectsPage = () => {
    return (
        <>
            <Header />
            <ProjectsHero />
            <ProjectHighlights />
            <ProjectPhaseOne />
            <ProjectsGallery />
            <WhyShekvetili />
            <RequestCall />
            <AttractionsSection />
            <ProjectsBanner />
            <AdditionalInfrastructure />
            <ServiceSection />
            <TermsOfSale />
            <div className="md:max-w-full [@media(min-width:2000px)]:max-w-7xl mx-auto">
                <ContactForm />
            </div>
            <Footer />
        </>
    );
};

export default ProjectsPage;