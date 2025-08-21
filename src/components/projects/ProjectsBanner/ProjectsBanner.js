import React from "react";

const ProjectsBanner = () => {
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      role="banner"
      aria-labelledby="infinity-pool-title"
    >
      {/* Main Largfe Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/shekvetili/big-banner.webp')]"
        role="img"
        aria-label="Luxury infinity pool with panoramic sea view at sunset"
      />

      {/* Overlay Text on Main Image */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <header>
          <h4
            id="infinity-pool-title"
            className="text-white font-light text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none"
            style={{ fontFamily: '"Baskerville Display PT", serif' }}
          >
            INFINITY
            <span className="block italic font-extralight -mt-10" style={{ fontFamily: '"Snell Roundhand", cursive' }}>Pool</span>
          </h4>
        </header>
      </div>

      {/* Small Overlaid Image - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <img
            src="/shekvetili/small-banner.webp"
            alt="Person enjoying sunset at infinity pool edge with scenic mountain view"
            className="w-[55rem] h-[30rem] object-cover shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Optional Dark Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
    </section>
  );
};

export default ProjectsBanner;
