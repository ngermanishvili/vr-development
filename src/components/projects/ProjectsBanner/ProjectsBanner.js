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
  const titlesRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const enterFromTop = true; // Toggle: true -> slides enter from top, false -> from bottom

  const slides = [
    {
      bgImage: "/shekvetili/big-banner.webp",
      smallImage: "/shekvetili/small-banner.webp",
      title: "INFINITY",
      subtitle: "Pool"
    },
    {
      bgImage: "/shekvetili/batumi.jpg",
      smallImage: "/shekvetili/batumi.jpg",
      title: "LUXURY",
      subtitle: "Resort"
    },
    {
      bgImage: "/shekvetili/batumi2.jpg",
      smallImage: "/shekvetili/batumi2.jpg",
      title: "PARADISE",
      subtitle: "Experience"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const slideElements = slidesRef.current;
    const titleElements = titlesRef.current;

    if (!container || slideElements.length === 0) return;

    // Initial state
    slideElements.forEach((slide, index) => {
      gsap.set(slide, {
        y: index === 0 ? "0%" : (enterFromTop ? "-100%" : "100%"),
        zIndex: index + 1,
        willChange: "transform"
      });
      if (titleElements[index]) {
        gsap.set(titleElements[index], {
          y: index === 0 ? 0 : 70,
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.88
        });
      }
    });

    // Master timeline for smoother, predictable flow
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${slides.length * 180}%`,
        scrub: 2.2,
        pin: true,
        anticipatePin: 1
      }
    });

    for (let i = 1; i < slideElements.length; i++) {
      const current = slideElements[i];
      const prev = slideElements[i - 1];
      const currentTitle = titleElements[i];
      const prevTitle = titleElements[i - 1];

      // Slide-in
      tl.to(current, { y: "0%", duration: 1 }, ">");

      // Subtle depth on previous
      if (prev) tl.to(prev, { scale: 0.985, duration: 1 }, "<");

      // Title crossfade
      if (prevTitle) {
        tl.to(prevTitle, { y: -40, opacity: 0, scale: 1.03, duration: 0.45, ease: "power1.inOut" }, "<+0.35");
      }
      if (currentTitle) {
        tl.fromTo(currentTitle,
          { y: 70, opacity: 0, scale: 0.88 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
          "<+0.35"
        );
      }
    }

    // Ensure first title remains visible without conflicting intro tween
    if (titleElements[0]) {
      gsap.set(titleElements[0], { y: 0, opacity: 1, scale: 1 });
    }

    // Progress indicator based on overall scroll
    const progressTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${slides.length * 180}%`,
      onUpdate: (self) => {
        const idx = Math.max(0, Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1))));
        setCurrentSlide(idx);
      }
    });

    return () => {
      tl.kill();
      progressTrigger.kill();
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
            <div
              ref={el => titlesRef.current[index] = el}
              className="absolute top-8 left-8 md:top-12 md:left-12 z-20"
            >
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