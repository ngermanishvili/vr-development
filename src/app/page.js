import AboutLanding from "@/components/landing/About/AboutSection";
import LandingAccordion from "@/components/landing/Accordion/LandingAccordion";
import AttractionsSectionLanding from "@/components/landing/AttractionsListLanding/AttractionsListSection";
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

export const metadata = {
  title: "VR Holding - Luxury Real Estate & Resort Development in Georgia",
  description: "Explore VR Holding's premium real estate projects in Georgia including VR Shekvetili Forest Beach resort, luxury apartments, and world-class developments. Discover your dream property with Georgia's leading developer.",
  keywords: "VR Holding, luxury real estate Georgia, Shekvetili beach resort, premium apartments Tbilisi, Georgian property investment, luxury development, beachfront properties, resort living Georgia",
  openGraph: {
    title: "VR Holding - Luxury Real Estate & Resort Development",
    description: "Discover premium real estate projects by VR Holding - from beachfront resorts to luxury urban developments in Georgia's most desirable locations.",
    images: [
      {
        url: '/landing/hero/landing_banner.png',
        width: 1200,
        height: 630,
        alt: 'VR Holding Luxury Real Estate Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VR Holding - Luxury Real Estate & Resort Development",
    description: "Premium real estate projects in Georgia - luxury resorts, apartments, and developments by VR Holding.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <LandingHero />
      <AboutLanding />
      <StatisticLanding />
      <div className="md:max-w-full [@media(min-width:2000px)]:max-w-7xl mx-auto">
        <ProjectsLanding />
      </div>
      <LandingAccordion />
      <LandingImg />
      <div className="md:max-w-full [@media(min-width:2000px)]:max-w-7xl mx-auto">
        <FeaturedStories />
      </div>

      <NearbyLocations />
      <AttractionsSectionLanding />
      <div className="md:max-w-full [@media(min-width:2000px)]:max-w-7xl mx-auto">
        <Rent />
      </div>
      <VRClubCard />
      <div className="md:max-w-full [@media(min-width:2000px)]:max-w-7xl mx-auto">
        <ContactForm />
      </div>
    </div>

  );
}
