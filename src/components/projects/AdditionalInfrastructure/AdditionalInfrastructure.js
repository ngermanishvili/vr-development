"use client";

import React, { useState, useEffect, useRef } from "react";

const AdditionalInfrastructure = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const infrastructureSlides = [
    // Slide 1
    [
      {
        id: 1,
        title: "Outdoor and indoor swimming pools",
        image: "/shekvetili/outdoor.webp",
        alt: "Modern outdoor and indoor swimming pools with comfortable seating area",
        size: "large",
      },
      {
        id: 2,
        title: "1200 meters long coastline",
        image: "/shekvetili/1200_meters.webp",
        alt: "Beautiful 1200 meter long private coastline with beach chairs and umbrellas",
        size: "medium",
      },
      {
        id: 3,
        title: "Yacht club",
        image: "/shekvetili/yacht_club.webp",
        alt: "Luxury yacht club with marina and sailing facilities",
        size: "small",
      },
      {
        id: 4,
        title: "Rest space",
        image: "/shekvetili/recreational _spaces.webp",
        alt: "Peaceful rest space with green lawns and relaxation areas",
        size: "small",
      },
    ],
    // Slide 2 (using same images for demo)
    [
      {
        id: 5,
        title: "Premium facilities",
        image: "/shekvetili/yacht_club.webp",
        alt: "Premium facilities and amenities",
        size: "large",
      },
      {
        id: 6,
        title: "Beachfront access",
        image: "/shekvetili/outdoor.webp",
        alt: "Direct beachfront access",
        size: "medium",
      },
      {
        id: 7,
        title: "Spa services",
        image: "/shekvetili/recreational _spaces.webp",
        alt: "Luxury spa and wellness services",
        size: "small",
      },
      {
        id: 8,
        title: "Private dining",
        image: "/shekvetili/1200_meters.webp",
        alt: "Private dining experiences",
        size: "small",
      },
    ],
    // Slide 3 (using same images for demo)
    [
      {
        id: 9,
        title: "Entertainment center",
        image: "/shekvetili/recreational _spaces.webp",
        alt: "Modern entertainment center",
        size: "large",
      },
      {
        id: 10,
        title: "Water sports",
        image: "/shekvetili/yacht_club.webp",
        alt: "Water sports facilities",
        size: "medium",
      },
      {
        id: 11,
        title: "Fitness center",
        image: "/shekvetili/outdoor.webp",
        alt: "State-of-the-art fitness center",
        size: "small",
      },
      {
        id: 12,
        title: "Concierge services",
        image: "/shekvetili/1200_meters.webp",
        alt: "24/7 concierge services",
        size: "small",
      },
    ],
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % infrastructureSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + infrastructureSlides.length) % infrastructureSlides.length
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % infrastructureSlides.length);
      }, 6000); // 6 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, infrastructureSlides.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsHovered(true); // Pause auto-slide during touch
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsHovered(false); // Resume auto-slide
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setIsHovered(false); // Resume auto-slide after swipe
  };

  const renderSlideContent = (slideItems) => (
    <>
      {/* First item - spans 2 columns */}
      <article className="col-span-2 group cursor-pointer">
        <div className="relative h-full overflow-hidden">
          <img
            src={slideItems[0].image}
            alt={slideItems[0].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>

          {/* Title Overlay - Top */}
          <div className="absolute top-6 left-6 right-6">
            <h3 className="text-white text-lg md:text-xl font-medium leading-tight" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
              {slideItems[0].title}
            </h3>
          </div>
        </div>
      </article>

      {/* Second item - single column, full height */}
      <article className="group cursor-pointer">
        <div className="relative h-full overflow-hidden">
          <img
            src={slideItems[1].image}
            alt={slideItems[1].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>

          {/* Title Overlay - Top */}
          <div className="absolute top-6 left-6 right-6">
            <h3 className="text-white text-lg md:text-xl font-medium leading-tight" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
              {slideItems[1].title}
            </h3>
          </div>
        </div>
      </article>

      {/* Third and Fourth items - stacked in one column */}
      <div className="flex flex-col gap-4">
        {/* Third item */}
        <article className="group cursor-pointer flex-1">
          <div className="relative h-full overflow-hidden">
            <img
              src={slideItems[2].image}
              alt={slideItems[2].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>

            {/* Title Overlay - Top */}
            <div className="absolute top-4 left-4 right-4">
              <h3 className="text-white text-base md:text-lg font-medium leading-tight" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
                {slideItems[2].title}
              </h3>
            </div>
          </div>
        </article>

        {/* Fourth item */}
        <article className="group cursor-pointer flex-1">
          <div className="relative h-full overflow-hidden">
            <img
              src={slideItems[3].image}
              alt={slideItems[3].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>

            {/* Title Overlay - Top */}
            <div className="absolute top-4 left-4 right-4">
              <h3 className="text-white text-base md:text-lg font-medium leading-tight" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
                {slideItems[3].title}
              </h3>
            </div>
          </div>
        </article>
      </div>
    </>
  );

  return (
    <section
      className="py-16 px-4 overflow-hidden"
      aria-labelledby="infrastructure-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <header className="mb-12">
          <p
            id="infrastructure-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight max-w-md"
            style={{ fontFamily: '"Baskerville Display PT", serif' }}
          >
            ADDITIONAL
            <br />
            INFRASTRUCTURE
          </p>
        </header>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {infrastructureSlides.map((slideItems, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-[600px]">
                    {renderSlideContent(slideItems)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Only on desktop */}
          <button
            onClick={prevSlide}
            className={`absolute -left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 hidden md:block  cursor-pointer
              ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }
            `}
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className={`absolute -right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-20 hidden md:block cursor-pointer
              ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }
            `}
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdditionalInfrastructure;
