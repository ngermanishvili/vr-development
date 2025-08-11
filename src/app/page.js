import AboutHero from "@/components/about/AboutHero/about-hero";
import AboutLanding from "@/components/landing/About/AboutSection";
import LandingAccordion from "@/components/landing/Accordion/LandingAccordion";
import LandingBanner from "@/components/landing/BannerLanding/LandingBanner";
import LandingHero from "@/components/landing/Hero/LandingHero";
import ProjectsLanding from "@/components/landing/Projects/Projects";
import StatisticLanding from "@/components/landing/statistic/StatisticSection";
import ProjectsHero from "@/components/projects/ProjectsHero/ProjectsHero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHero />
      <AboutLanding />
      <StatisticLanding />
      <ProjectsLanding />
      <LandingAccordion />
    </div>

  );
}
