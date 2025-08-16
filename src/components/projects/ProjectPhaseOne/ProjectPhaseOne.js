import React from "react";

const ProjectPhaseOne = () => {
  return (
    <section 
      className="relative h-[60vh] min-h-[500px] w-full overflow-hidden" 
      role="region"
      aria-labelledby="first-phase-title"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/shekvetili/vr-bg.webp')]"
        role="img"
        aria-label="Shekvetili resort first phase development area with modern architectural visualization"
      >

      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            
            {/* Text Content */}
            <article className="text-black">
              <header className="mb-8">
                <h1 
                  id="first-phase-title"
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-black"
                >
                  THE FIRST PHASE
                  <br />
                  <span className="text-3xl sm:text-4xl md:text-5xl text-black">
                    OF THE PROJECT
                  </span>
                </h1>
              </header>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                  Project offers investment and residential blocks A, B1, B2 and C, 
                  featuring 5-star apartments, apart-hotels and business apartments. 
                  Additionally, this phase will introduce Adjara's most innovative 
                  beach club and entertainment pavilions.
                </p>
              </div>

              <nav role="navigation" aria-label="Apartment selection">
                <a
                  href="#apartments"
                  className="inline-block px-8 py-4 bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-base font-medium tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-transparent"
                  role="button"
                  aria-label="Browse available apartments in first phase"
                >
                  CHOOSE APARTMENT
                </a>
              </nav>
            </article>


          </div>
        </div>
      </div>


    </section>
  );
};

export default ProjectPhaseOne;