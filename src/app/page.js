import AboutLanding from "@/components/landing/About/AboutSection";
import LandingAccordion from "@/components/landing/Accordion/LandingAccordion";
import ContactForm from "@/components/landing/ContactForm/ContactForm";
import FeaturedStories from "@/components/landing/FeaturedStories/FeaturedStories";
import LandingHero from "@/components/landing/Hero/LandingHero";
import LandingImg from "@/components/landing/Hero/LandingImg";
import NearbyLocations from "@/components/landing/NearbyLocations/NearbyLocations";
import ProjectsLanding from "@/components/landing/Projects/Projects";
import Rent from "@/components/landing/Rent/Rent";
import StatisticLanding from "@/components/landing/statistic/StatisticSection";
import VRClubCard from "@/components/landing/VRClubCard/VRClubCard";
import AttractionsSection from "@/components/projects/AttractionsListSection/AttractionsListSection";

// Force dynamic rendering in development
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <LandingHero />
      <div className="2xl:max-w-7xl md:max-w-full mx-auto">
        <AboutLanding />
        <StatisticLanding />
        <ProjectsLanding />
        <LandingAccordion />
        <LandingImg />
        <FeaturedStories />

        <NearbyLocations />
        <AttractionsSection />

        <Rent />
        <VRClubCard />
        <ContactForm />
      </div>

    </div>

  );
}
