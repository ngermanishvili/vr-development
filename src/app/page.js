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

// Force dynamic rendering in development
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHero />
      <AboutLanding />
      <StatisticLanding />
      <ProjectsLanding />
      <LandingAccordion />
      <NearbyLocations />
      <LandingImg />
      <FeaturedStories />
      <Rent />
      <VRClubCard />
      <ContactForm />
    </div>

  );
}
