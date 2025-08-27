"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsBanner = () => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bgImage: "/shekvetili/big-banner.webp",
      smallImage: "/shekvetili/small-banner.webp",
      title: "INFINITY",
      subtitle: "Pool"
    },
    {
      bgImage: "/shekvetili/big-banner.webp",
      smallImage: "/shekvetili/small-banner.webp", 
      title: "LUXURY",
      subtitle: "Resort"
    },
    {
      bgImage: "/shekvetili/big-banner.webp",
      smallImage: "/shekvetili/small-banner.webp",
      title: "PARADISE",
      subtitle: "Experience"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const slideElements = slidesRef.current;

    if (!container || slideElements.length === 0) return;

    // Create timeline for slide animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${slides.length * 100}%`, // Each slide takes 100% of viewport height
        scrub: 1,
        pin: true, // Pin the section while scrolling through slides
        snap: {
          snapTo: (value) => {
            // Snap to slide positions (0, 0.5, 1 for 3 slides)
            const slideIndex = Math.round(value * (slides.length - 1));
            setCurrentSlide(slideIndex);
            return slideIndex / (slides.length - 1);
          },
          duration: 0.5,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          // Update current slide based on progress
          const slideIndex = Math.floor(self.progress * slides.length);
          const clampedIndex = Math.min(slideIndex, slides.length - 1);
          setCurrentSlide(clampedIndex);
        }
      }
    });

    // Animate slides
    slideElements.forEach((slide, index) => {
      if (index === 0) return; // First slide is already visible

      // Set initial position
      gsap.set(slide, { y: "100%" });

      // Animate slide in
      tl.to(slideElements[index - 1], {
        y: "-100%",
        duration: 1,
        ease: "power2.inOut"
      }, index)
      .to(slide, {
        y: "0%", 
        duration: 1,
        ease: "power2.inOut"
      }, index);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [slides.length]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={el => slidesRef.current[index] = el}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('${slide.bgImage}')`,
                backgroundColor: '#a3a3a3'
              }}
            />

            {/* Content */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
              <h4
                className="text-white font-light text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none drop-shadow-2xl"
                style={{ fontFamily: '"Baskerville Display PT", serif' }}
              >
                {slide.title}
                <span 
                  className="block italic font-extralight -mt-[14px] sm:-mt-10 font-snell-bold " 
                 
                >
                  {slide.subtitle}
                </span>
              </h4>
            </div>

            {/* Small Image */}
            <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
              <div
                className="w-[55rem] h-[30rem] bg-gray-300 shadow-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.smallImage}')` }}
              />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-8 z-30">
        <div className="text-white">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-light">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-px bg-white/30 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-lg opacity-60">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsBanner;