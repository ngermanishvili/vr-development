"use client";

import React, { useState, useMemo } from "react";

const ProjectGallery = () => {
  const [activeTab, setActiveTab] = useState("interior");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ფოტოების მონაცემები - კატეგორიებით
  const galleryImages = {
    interior: [
      {
        src: "/shekvetili/slide-1.webp",
        alt: "Modern apartment interior with luxury furnishings and sea view"
      },
      {
        src: "/shekvetili/vr-bg.webp", 
        alt: "Elegant living space with contemporary design elements"
      }
    ],
    exterior: [
      {
        src: "/shekvetili/shekvetili.webp",
        alt: "Shekvetili resort exterior view with beach and modern architecture"
      }
    ]
  };

  // ამჟამინდელი კატეგორიის ფოტოები
  const currentImages = useMemo(() => {
    return galleryImages[activeTab] || [];
  }, [activeTab]);

  // საერთო სტატისტიკა
  const totalInteriorImages = galleryImages.interior.length;
  const totalExteriorImages = galleryImages.exterior.length;
  const currentTotal = currentImages.length;
  const currentPosition = currentImageIndex + 1;

  // ფოტოს შეცვლის ფუნქციები
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  // ტაბის შეცვლისას ფოტოს ინდექსის გადატვირთვა
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentImageIndex(0);
  };

  return (
    <section 
      className="pt-12 md:pt-16 px-4 bg-white"
      role="region"
      aria-labelledby="gallery-title"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Gallery Header */}
        <header className="flex justify-between items-end mb-8">
          {/* Left Side - Tabs and Title */}
          <div>
            {/* Tab Navigation */}
            <nav 
              className="flex gap-0 mb-4"
              role="tablist"
              aria-label="Gallery categories"
            >
              <button
                role="tab"
                aria-selected={activeTab === "interior"}
                aria-controls="gallery-content"
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                  activeTab === "interior"
                    ? "bg-black text-white"
                    : "bg-transparent text-black border border-black hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("interior")}
              >
                INTERIOR
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "exterior"}
                aria-controls="gallery-content"
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                  activeTab === "exterior"
                    ? "bg-black text-white"
                    : "bg-transparent text-black border border-black hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("exterior")}
              >
                EXTERIOR
              </button>
            </nav>

            {/* Gallery Title */}
            <h2 
              id="gallery-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase"
            >
              GALLERY
            </h2>
          </div>

          {/* Right Side - Image Counter */}
          <div className="text-right">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              {String(currentPosition).padStart(2, '0')}/{String(currentTotal).padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Gallery Content */}
        <div 
          id="gallery-content"
          role="tabpanel"
          aria-labelledby="gallery-title"
          className="relative"
        >
          {currentImages.length > 0 ? (
            <div className="relative aspect-video w-full overflow-hidden">
              {/* Main Image */}
              <img
                src={currentImages[currentImageIndex].src}
                alt={currentImages[currentImageIndex].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="lazy"
              />

              {/* Navigation Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}


            </div>
          ) : (
            <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;