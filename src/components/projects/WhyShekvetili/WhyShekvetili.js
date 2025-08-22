import React from "react";

const WhyShekvetili = () => {
  return (
    <section 
      className="relative py-20 md:py-32 px-4"
      role="region"
      aria-labelledby="services-title"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/shekvetili/sea.webp')]"
        role="img"
        aria-label="Crystal clear blue sea water at Shekvetili beach resort"
      >
        <div
          className="absolute inset-0 bg-blue-900/20"
          aria-hidden="true"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 
            id="services-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: '"Baskerville Display PT", serif' }}
          >
            WHY ADJARA & SHEKVETILI?
          </h2>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-20">
          
          {/* Left Column */}
          <div className="space-y-10 mx-auto">
            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Premier destination for tourism,<br />
                investment, and natural beauty
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Simplicity and Transparency
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Attractive Tax Environment:<br />
                only 5% tax on rental income
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                No ownership restrictions<br />
                for foreign citizens in Georgia
              </p>
            </article>
          </div>

          {/* Right Column */}
          <div className="space-y-10 mx-auto">
            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Property registration in just<br />
                one business day for only $60
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                One of the safest country
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Pure sea water
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Humid subtropical and ionized air
              </p>
            </article>

            <article className="flex items-start gap-4">
              <div 
                className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white min-w-[300px]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                Healing magnetic sand
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShekvetili;