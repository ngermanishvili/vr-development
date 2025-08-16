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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight">
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
                className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base lg:text-lg font-medium tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                role="button"
                aria-label="Download project presentation PDF"
              >
                DOWNLOAD PRESENTATION
              </a>

              <a
                href="#video"
                className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base lg:text-lg font-medium tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
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
