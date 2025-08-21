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
const ProjectsPage = () => {
  return (
    <>
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
      <ContactForm />
    </>
  );
};

export default ProjectsPage;
