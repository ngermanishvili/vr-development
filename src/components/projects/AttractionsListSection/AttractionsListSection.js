"use client";

import React, { useState, useEffect, useRef } from "react";

const AttractionsSection = () => {
  const [hoveredPin, setHoveredPin] = useState(null);
  const [hoveredText, setHoveredText] = useState(null);
  const [currentImage, setCurrentImage] = useState("shekvetili/slide-1.webp");
  const [containerDimensions, setContainerDimensions] = useState(null);
  const mapRef = useRef(null);
  const imageRef = useRef(null);

  const locations = [
    {
      id: 1,
      name: "Paragraph Resort & Spa",
      distance: "100 m",
      image: "shekvetili/slide-1.webp",
    },
    {
      id: 2,
      name: "Black Sea Arena",
      distance: "1.8 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 3,
      name: "Dendrological Park",
      distance: "2.8 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 4,
      name: "Tsitsinatela Amusement Park",
      distance: "5 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 5,
      name: "Musicians Park Miniature Park",
      distance: "1.7 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 6,
      name: "Miniature Park",
      distance: "5.6 m",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 7,
      name: "Kobuleti City Centre",
      distance: "13.3 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 8,
      name: "Batumi City Centre",
      distance: "34 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 9,
      name: "Batumi International Airport",
      distance: "54 km",
      image: "shekvetili/1200_meters.webp",
    },
    {
      id: 10,
      name: "Kutaisi International Airport",
      distance: "77 km",
      image: "shekvetili/1200_meters.webp",
    },
  ];

  // რესპონსიული პოზიციები 
  const getPinPositions = () => {
    if (!mapRef.current) {
      return [
        { id: 1, left: 33, top: 47 },
        { id: 2, left: 37, top: 53},
        { id: 3, left: 35, top: 42},
        { id: 4, left: 33, top: 59 },
        { id: 5, left: 32.5, top: 52.5 },
        { id: 6, left: 32, top: 64 },
        { id: 7, left: 30, top: 69 },
        { id: 8, left: 28, top: 74 },
        { id: 9, left: 33, top: 73 },
        { id: 10, left: 52, top: 38 },
      ];
    }
    
    const containerWidth = mapRef.current.getBoundingClientRect().width;
    const isMobile = containerWidth < 768; // md breakpoint
    
    if (isMobile) {
      // პატარა ეკრანებისთვის 
      return [
        { id: 1, left: 33, top: 47 },
        { id: 2, left: 37, top: 53},
        { id: 3, left: 35, top: 42},
        { id: 4, left: 33, top: 59 },
        { id: 5, left: 32.5, top: 52.5 },
        { id: 6, left: 32, top: 64 },
        { id: 7, left: 30, top: 69 },
        { id: 8, left: 28, top: 74 },
        { id: 9, left: 33, top: 73 },
        { id: 10, left: 52, top: 38 },
      ];
    } else {
      // დესკტოპი
      return [
        { id: 1, left: 32.5, top: 47 },
        { id: 2, left: 35, top: 53},
        { id: 3, left: 33.5, top: 43},
        { id: 4, left: 32.7, top: 57 },
        { id: 5, left: 32.4, top: 51 },
        { id: 6, left: 32, top: 64 },
        { id: 7, left: 30, top: 69 },
        { id: 8, left: 28, top: 74 },
        { id: 9, left: 32, top: 73 },
        { id: 10, left: 52, top: 38 },
      ];
    }
  };

  // VR პინისთვის
  const getVrPinPosition = () => {
    if (!mapRef.current) return { left: 29.5, top: 42 };
    
    const containerWidth = mapRef.current.getBoundingClientRect().width;
    const isMobile = containerWidth < 768;
    
    return isMobile 
      ? { left: 30, top: 43 }    // მობაილზე
      : {  left: 30, top: 43}; // დესკტოპზე
  }; 

  const pinPositions = getPinPositions();
  const vrPinPosition = getVrPinPosition();

  // რეალური პოზიციის გამოთვლა ზუსტი object-fit: cover ალგორითმით
  const calculateRealPosition = (pinPercent) => {
    if (!mapRef.current || !imageRef.current) return { left: '0px', top: '0px' };

    const container = mapRef.current;
    const image = imageRef.current;
    
    // რეალური ზომები
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    //  რუკის ზუსტი ზომები
    const imageNaturalWidth = image.naturalWidth || 1667;
    const imageNaturalHeight = image.naturalHeight || 1250;
    
    // object-fit: cover ალგორითმი
    const imageRatio = imageNaturalWidth / imageNaturalHeight;
    const containerRatio = containerWidth / containerHeight;
    
    let renderedWidth, renderedHeight, offsetX, offsetY;
    
    if (containerRatio > imageRatio) {
      // კონტეინერი უფრო ფართოა - ფოტო მთლიანად ავსებს სიგანეს
      renderedWidth = containerWidth;
      renderedHeight = containerWidth / imageRatio;
      offsetX = 0;
      offsetY = (containerHeight - renderedHeight) / 2;
    } else {
      renderedHeight = containerHeight;
      renderedWidth = containerHeight * imageRatio;
      offsetY = 0;
      offsetX = (containerWidth - renderedWidth) / 2;
    }
    
    // ზუსტი პოზიცია
    const pinX = offsetX + (renderedWidth * pinPercent.left / 100);
    const pinY = offsetY + (renderedHeight * pinPercent.top / 100);
    
    return {
      left: `${pinX}px`,
      top: `${pinY}px`
    };
  };

  // განახლება ნებისმიერი ცვლილების დროს
  const updatePositions = () => {
    if (mapRef.current && imageRef.current) {
      setContainerDimensions({
        width: mapRef.current.getBoundingClientRect().width,
        height: mapRef.current.getBoundingClientRect().height,
        timestamp: Date.now()
      });
      // ასევე განახლება რესპონსიული პოზიციებისთვის
      setHoveredText(null); // force re-render
    }
  };

  useEffect(() => {
    // დებაუნს ფუნქცია resize-ისთვის
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updatePositions, 50);
    };

    // image load event
    const handleImageLoad = () => {
      setTimeout(updatePositions, 100); // მცირე დაყოვნება რომ ბრაუზერმა სრულად განახლოს
    };

    // event listeners
    window.addEventListener('resize', handleResize);
    
    const img = imageRef.current;
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    }

    // საწყისი განახლება
    setTimeout(updatePositions, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (img) {
        img.removeEventListener('load', handleImageLoad);
      }
    };
  }, []);

  // IntersectionObserver რომ დავრწმუნდეთ რომ ელემენტი ხილულია
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(updatePositions, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const columnGroups = [locations.slice(0, 5), locations.slice(5, 10)];

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <article className="max-w-7xl mx-auto">
          {/* რუკის სექცია */}
          <div
            ref={mapRef}
            className="relative mb-8 w-full overflow-hidden bg-gray-200"
            style={{ 
              width: "110%", 
              marginLeft: "-5%", 
              height: "clamp(500px, 50vw, 800px)"
            }}
          >
            {/* რუკის ფოტო */}
            <img
              ref={imageRef}
              src="shekvetili/map-close.png"
              alt="პროექტის მდებარეობის რუკა"
              className="w-full h-full object-cover block"
              onLoad={updatePositions}
              onError={(e) => {
                console.error('Image failed to load:', e);
              }}
            />

            {/* პროექტის მდებარეობის ტექსტი */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 p-2 lg:p-4 text-right z-30">
              <h2 className="text-xs sm:text-sm lg:text-xl font-bold mb-1 lg:mb-2 text-black leading-tight">
                PROJECT<br/> LOCATION
              </h2>
              <p className="text-xs lg:text-sm text-black leading-tight">Next To Icon hotel Paragraph</p>
              <p className="text-xs lg:text-sm text-black leading-tight">Resort & Spa. Autograph</p>
              <p className="text-xs lg:text-sm text-black leading-tight">Collection</p>
            </div>

            {/* VR პინი */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300 z-20"
              style={calculateRealPosition(vrPinPosition)}
              onMouseEnter={() => {
                setHoveredPin(true);
                setCurrentImage("shekvetili/recreational _spaces.webp");
              }}
              onMouseLeave={() => {
                setHoveredPin(false);
                setCurrentImage("shekvetili/recreational _spaces.webp");
              }}
            >
              <img
                src="shekvetili/vr-pin.webp"
                alt="VR მდებარეობის პინი"
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 object-contain drop-shadow-lg"
                draggable={false}
              />
            </div>

            {/* რიცხვიანი პინები */}
            {pinPositions.map((pin) => (
              <div
                key={pin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-300 z-10"
                style={calculateRealPosition(pin)}
                onMouseEnter={() => {
                  setHoveredText(pin.id);
                  setCurrentImage(
                    locations.find((loc) => loc.id === pin.id).image
                  );
                }}
                onMouseLeave={() => {
                  setHoveredText(null);
                  setCurrentImage("shekvetili/slide-1.webp");
                }}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-[#D3D2C1] border-2 border-gray-400 text-black rounded-full flex items-center justify-center text-xs lg:text-sm font-bold hover:bg-[#CA9B43] hover:text-white hover:border-[#CA9B43] transition-all duration-300 shadow-lg">
                  {pin.id}
                </div>
              </div>
            ))}
          </div>

          {/* ქვედა სექცია */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16">
            {/* ფოტო */}
            <div className="relative">
              <div className="lg:pr-8">
                <img
                  src={currentImage}
                  alt="მდებარეობის გამოსახულება"
                  className="w-full h-48 sm:h-60 lg:h-80 object-cover transition-opacity duration-500 shadow-lg"
                />
              </div>

              {/* მარჯვენა საზღვარი ფოტოს შემდეგ */}
              <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-black"></div>
              <div className="lg:hidden w-full h-px bg-black mt-4"></div>
            </div>

            {/* ტექსტის სვეტები */}
            {columnGroups.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="relative">
                <div>
                  <ol className="space-y-2 lg:space-y-3">
                    {column.map((location) => (
                      <li
                        key={location.id}
                        className={`flex items-center py-2 lg:py-3 px-2 transition-all duration-300 ${
                          hoveredText === location.id
                            ? "text-[#CA9B43] font-semibold"
                            : "text-black"
                        }`}
                      >
                        <span className="w-6 lg:w-8 flex-shrink-0 font-bold text-sm lg:text-base">
                          {location.id}.
                        </span>
                        <span className="flex-1 px-2 lg:px-3 text-sm lg:text-base leading-tight">
                          {location.name}
                        </span>
                        <span className="font-black flex-shrink-0 text-sm lg:text-base">
                          {location.distance}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* მარჯვენა საზღვარი პირველი ტექსტის სვეტის შემდეგ */}
                {columnIndex === 0 && (
                  <>
                    <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-black"></div>
                    <div className="lg:hidden w-full h-px bg-black mt-4"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AttractionsSection;