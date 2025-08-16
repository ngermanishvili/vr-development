"use client";

import React, { useState } from "react";

const AttractionsSection = () => {
  const [hoveredPin, setHoveredPin] = useState(null);
  const [hoveredText, setHoveredText] = useState(null);
  const [currentImage, setCurrentImage] = useState("shekvetili/slide-1.webp");

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

  const pinPositions = [
    { id: 1, left: "15%", top: "40%" },
    { id: 2, left: "15%", top: "45%" },
    { id: 3, left: "15%", top: "50%" },
    { id: 4, left: "15%", top: "55%" },
    { id: 5, left: "15%", top: "60%" },
    { id: 6, left: "15%", top: "65%" },
    { id: 7, left: "15%", top: "70%" },
    { id: 8, left: "15%", top: "75%" },
    { id: 9, left: "15%", top: "80%" },
    { id: 10, left: "85%", top: "20%" },
  ];

  const vrPinPosition = { left: "45%", top: "85%" };

  const columnGroups = [locations.slice(0, 5), locations.slice(5, 10)];

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <article className="max-w-7xl mx-auto">
          {/* რუკის სექცია - სრული ზომა */}
          {/* რუკის სექცია */}
          <div
            className="relative mb-8 w-full overflow-hidden"
            style={{ width: "110%", marginLeft: "-5%", height: "800px" }}
          >
            {/* რუკის ფოტო */}
            <img
              src="shekvetili/map-close.png"
              alt="პროექტის მდებარეობის რუკა"
              className="w-full h-full object-cover object-left-bottom"
            />

            {/* პროექტის მდებარეობის ტექსტი */}
            <div className="absolute top-6 right-6 bg-white bg-opacity-95 p-4 text-right shadow-md rounded">
              <h2 className="text-xl font-bold mb-2">PROJECT LOCATION</h2>
              <p className="text-sm">Next To Icon hotel Paragraph</p>
              <p className="text-sm">Resort & Spa. Autograph</p>
              <p className="text-sm">Collection</p>
            </div>

            {/* VR პინი */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform duration-300 z-20"
              style={{ left: vrPinPosition.left, top: vrPinPosition.top }}
              onMouseEnter={() => {
                setHoveredPin(true);
                setCurrentImage("shekvetili/slide-1.webp");
              }}
              onMouseLeave={() => {
                setHoveredPin(false);
                setCurrentImage("shekvetili/slide-1.webp");
              }}
            >
              <img
                src="shekvetili/vr-pin.webp"
                alt="VR მდებარეობის პინი"
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
            </div>

            {/* რიცხვიანი პინები */}
            {pinPositions.map((pin) => (
              <div
                key={pin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-300 z-10"
                style={{ left: pin.left, top: pin.top }}
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
                <div className="w-8 h-8 bg-white border-3 border-black rounded-full flex items-center justify-center text-sm font-bold hover:bg-[#CA9B43] hover:text-white hover:border-[#CA9B43] transition-all duration-300 shadow-lg">
                  {pin.id}
                </div>
              </div>
            ))}
          </div>

          {/* ქვედა სექცია */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* ფოტო */}
            <div className="relative">
              <div className="lg:pr-8">
                <img
                  src={currentImage}
                  alt="მდებარეობის გამოსახულება"
                  className="w-full h-60 lg:h-80 object-cover transition-opacity duration-500 shadow-lg"
                />
              </div>

              {/* მარჯვენა საზღვარი ფოტოს შემდეგ */}
              <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-black"></div>

              <div className="lg:hidden w-full h-px bg-black mt-6"></div>
            </div>

            {/* ტექსტის სვეტები */}
            {columnGroups.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="relative">
                <div>
                  <ol className="space-y-3">
                    {column.map((location) => (
                      <li
                        key={location.id}
                        className={`flex items-center py-3 px-2 transition-all duration-300 ${
                          hoveredText === location.id
                            ? "text-[#CA9B43] font-semibold"
                            : "text-black"
                        }`}
                      >
                        <span className="w-8 flex-shrink-0 font-bold">
                          {location.id}.
                        </span>
                        <span className="flex-1 px-3">{location.name}</span>
                        <span className="font-black flex-shrink-0">
                          {location.distance}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* მარჯვენა საზღვარი პირველი ტექსტის სვეტის შემდეგ */}
                {columnIndex === 0 && (
                  <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-black"></div>
                )}

                {columnIndex === 0 && (
                  <div className="lg:hidden w-full h-px bg-black mt-6"></div>
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
