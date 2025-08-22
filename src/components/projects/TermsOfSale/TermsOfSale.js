"use client";

const TermsOfSale = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="mb-22">
        <p className="text-4xl md:text-5xl font-bold mb-6 text-[#CA9B43]" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
          TERMS OF SALE
        </p>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: '"Roboto", sans-serif' }}>
          Don't miss this unique opportunity to own a five-star apartment
          <br /> in an unprecedented project. Located in the best area on the
          <br /> Black Sea coast – starting from only $1,000 per month.
        </p>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
        {/* Single Payment Column */}
        <div className="relative md:pr-8">
          {/* Left border - only on desktop */}
          <div className="hidden md:block absolute left-0 top-0 w-px h-full bg-[#CA9B43]"></div>

          <div className="md:text-left md:pl-8">
            <p className="text-5xl md:text-6xl font-bold text-black mb-2" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
              -15%
            </p>
            <p className="text-lg text-black font-medium" style={{ fontFamily: '"Baskerville Display PT", serif' }}>for Single Payment</p>
          </div>

          {/* Vertical divider for desktop, horizontal for mobile */}
          <div className="hidden md:block absolute right-0 top-0 w-px h-full bg-[#CA9B43]"></div>
          <div className="block md:hidden w-full h-px mt-8 bg-[#CA9B43]"></div>
        </div>

        {/* Installments Column */}
        <div className="relative md:px-8">
          <div className="">
            <p className="text-5xl md:text-6xl font-bold text-black mb-2" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
              10 year
            </p>
            <p className="text-lg text-black font-medium" style={{ fontFamily: '"Baskerville Display PT", serif' }}>Installments</p>
          </div>

          {/* Vertical divider for desktop, horizontal for mobile */}
          <div className="hidden md:block absolute right-0 top-0 w-px h-full bg-[#CA9B43]"></div>
          <div className="md:hidden w-full h-px mt-8 bg-[#CA9B43]"></div>
        </div>

        {/* Internal Installments Column */}
        <div className="md:pl-8">
          <div className=" md:text-left">
            <p className="text-5xl md:text-6xl font-bold text-black mb-2" style={{ fontFamily: '"Baskerville Display PT", serif' }}>0%</p>
            <p className="text-lg text-black font-medium mb-8" style={{ fontFamily: '"Baskerville Display PT", serif' }}>
              Internal Installments
            </p>

            {/* Payment Visual Bar */}
            <div className="mb-4">
              {/* Percentage Labels Above */}
              <div className="flex justify-between mb-2">
                <span className="text-black font-bold text-lg" style={{ fontFamily: '"Baskerville Display PT", serif' }}>20%</span>
                <span className="text-black font-bold text-lg" style={{ fontFamily: '"Baskerville Display PT", serif' }}>80%</span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-16 bg-[#F1F1F1] flex overflow-hidden w-full">
                {/* 20% Black Section */}
                <div className="w-[20%] bg-black relative flex items-center justify-center"></div>
                {/* 80% Gray Section */}
                <div className="w-[80%] bg-[#F1F1F1] relative flex items-center justify-center"></div>
              </div>
            </div>

            {/* Description Text */}
            <div className="flex justify-between  md:text-left">
              <div className="">
                <span className="text-black text-sm" style={{ fontFamily: '"Roboto", sans-serif' }}>
                  Initial
                  <br /> contribution
                </span>
              </div>
              <div className="text-end">
                <span className="text-black text-sm" style={{ fontFamily: '"Roboto", sans-serif' }}>
                  Distributed until
                  <br /> construction is complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfSale;
