"use client";

const ProjectHighlights = () => {
  return (
    <section
      className="py-12 md:py-16 px-4"
      style={{ backgroundColor: "#CA9B43" }}
      aria-labelledby="project-highlights-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="project-highlights-title" className="sr-only">
          Shekvetili Resort Project Key Statistics
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 place-items-center">
          {/* Investment */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight drop-shadow-lg text-white">
              $600,000,000
              <br />
              INVESTMENT
            </h3>
          </div>

          {/* Land Area */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight drop-shadow-lg text-white">
              40
              <br />
              HECTARES LAND
              <br />
              AREA
            </h3>
          </div>

          {/* Beach Length */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight drop-shadow-lg text-white">
              1200
              <br />
              METERS LONG
              <br />
              SANDY BEACH
            </h3>
          </div>

          {/* Divider Lines */}
          <div
            className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 w-px h-20 bg-white/50"
            aria-hidden="true"
          />
          <div
            className="hidden md:block absolute left-2/3 top-1/2 -translate-y-1/2 w-px h-20 bg-white/50"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectHighlights;