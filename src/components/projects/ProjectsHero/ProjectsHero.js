import React from "react";

const ProjectsBanner = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden" role="banner">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/shekvetili/shekvetili.webp')]"
        role="img"
        aria-label="Shekvetili resort aerial view with beach and modern buildings"
      >
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"
          aria-hidden="true"
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <header className="text-center text-white">
            <h1 style={{ fontFamily: '"Baskerville Display PT", serif' }} className="md:text-6xl text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight">
              FIRST WORLD-CLASS RESORT
              <br />
              ON THE BLACK SEA IN
              <br />
              GEORGIA
            </h1>

            {/* Call-to-Action Buttons */}
            <nav
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16"
              role="navigation"
              aria-label="Main actions"
            >
              <a
                href="#presentation"
                className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 bg-transparent"
                role="button"
                aria-label="Download project presentation PDF"
              >
                DOWNLOAD PRESENTATION
              </a>

              <a
                href="#video"
                className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 bg-transparent"
                role="button"
                aria-label="Watch resort promotional video"
              >
                WATCH VIDEO
              </a>
            </nav>
          </header>
        </div>
      </div>
    </section>
  );
};

export default ProjectsBanner;
