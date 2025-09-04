"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Import the scraped coordinate data
import scrapedFloorData from "../../../B2-block-apartment-coords.json";

const TestFloorPolygons = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [hoveredApartment, setHoveredApartment] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [useScrapedData, setUseScrapedData] = useState(true);

  // Original Floor 1 coordinates (your manually drawn ones)

  // UNIVERSAL SOLUTION: Precise coordinate transformation based on image analysis
  const getUniversalTransform = (floorNumber) => {
    if (floorNumber === 1) return "";

    const floor = floorNumber - 1;

    const verticalOffset = floor * -22.43; // -22.43px per floor (67.3/3 = 22.43)
    const scaleReduction = floor * 0.0167; // 1.67% reduction per floor (5%/3 = 1.67%)
    const scale = 1 - scaleReduction;

    return `translate(0px, ${verticalOffset.toFixed(
      1
    )}px) scale(${scale.toFixed(3)})`;
  };

  // ALTERNATIVE: Individual apartment coordinate recalculation (if SVG transform doesn't work)
  const recalculateApartmentCoords = (coords, floorNumber) => {
    if (floorNumber === 1) return coords;

    const floor = floorNumber - 1;
    const coordsArray = coords.split(",").map(Number);
    const newCoords = [];

    // Building center point for scaling reference
    const buildingCenterX = 960; // Approximate center X of building in image
    const buildingCenterY = 640; // Approximate center Y of building in image

    // Same transformation values as SVG method
    const verticalOffset = floor * -22.43;
    const scaleReduction = floor * 0.0167;
    const scaleFactor = 1 - scaleReduction;

    // Apply transformation to each coordinate pair
    for (let i = 0; i < coordsArray.length; i += 2) {
      const x = coordsArray[i];
      const y = coordsArray[i + 1];

      // Scale relative to building center, then translate
      const scaledX = buildingCenterX + (x - buildingCenterX) * scaleFactor;
      const scaledY =
        buildingCenterY + (y - buildingCenterY) * scaleFactor + verticalOffset;

      newCoords.push(Math.round(scaledX));
      newCoords.push(Math.round(scaledY));
    }

    return newCoords.join(",");
  };

  // Generate apartments for selected floor
  const getApartmentsForFloor = (floorNumber) => {
    if (scrapedFloorData[floorNumber]) {
      // Use real scraped coordinates from Block B1
      return scrapedFloorData[floorNumber];
    } else {
      // No data available for this floor
      return [];
    }
  };

  // Get the appropriate transform based on data source
  const getCurrentTransform = (floorNumber) => {
    // No transform needed when using real scraped coordinates from B1
    return "";
  };

  const currentApartments = getApartmentsForFloor(selectedFloor);

  const handleApartmentClick = (apartment) => {
    setSelectedApartment(apartment);
    console.log("Selected apartment:", apartment);
  };

  const getPolygonStyle = (apartment) => {
    const isHovered = hoveredApartment === apartment.id;
    const isSelected = selectedApartment?.id === apartment.id;

    return {
      fill: isSelected
        ? "rgba(59, 130, 246, 0.5)"
        : isHovered
        ? "rgba(34, 197, 94, 0.4)"
        : "rgba(255, 255, 255, 0.2)",
      stroke: isSelected ? "#3b82f6" : isHovered ? "#22c55e" : "#ffffff",
      strokeWidth: isSelected ? 3 : 2,
      cursor: "pointer",
      transition: "all 0.2s ease",
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Block B1 Floor Polygons Test
        </h1>

        {/* Floor selector */}
        <div className="mb-6 flex gap-4">
          <label className="text-white">Select Floor:</label>
          {[1, 2, 3, 4, 5, 6, 7].map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-4 py-2 rounded ${
                selectedFloor === floor
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Floor {floor}
            </button>
          ))}
        </div>

        {/* Floor info */}
        <div className="mb-4 p-4 bg-green-900 rounded text-white">
          <h3 className="font-semibold mb-2">🎯 Using Real Scraped Data</h3>
          <p>
            All coordinates extracted from VR.ge - the same data used on the
            live website!
          </p>
          <p>
            Total floors available: 1-7 (Block B1 apartment data from VR.ge)
          </p>
        </div>

        {/* Display current parameters */}
        <div className="mb-6 p-4 bg-gray-800 rounded text-white">
          <h3 className="font-semibold mb-2">Floor {selectedFloor} Data</h3>

          <div>
            <p>✅ Using REAL coordinates from VR.ge website</p>
            <p>
              Floor {selectedFloor}: {currentApartments.length} apartments found
            </p>
            {scrapedFloorData[selectedFloor] ? (
              <p className="text-green-400">✅ Real scraped data loaded</p>
            ) : (
              <p className="text-red-400">❌ No data for this floor</p>
            )}
            <p className="text-sm text-gray-400">
              No transforms needed - using actual coordinates!
            </p>
          </div>
        </div>

        {/* Floor plan with SVG overlay */}
        <div className="relative inline-block">
          <Image
            src={`/blocks/b1-block/B1-ჭრა ${selectedFloor} სართული.jpg`}
            alt={`Floor ${selectedFloor}`}
            width={1920}
            height={1080}
            className="max-w-full h-auto"
            priority
          />

          {/* SVG overlay for interactive polygons */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1280 640"
            preserveAspectRatio="xMidYMid meet"
            style={{
              pointerEvents: "auto",
            }}
          >
            {currentApartments.map((apartment) => (
              <polygon
                key={apartment.id}
                points={apartment.coords}
                style={getPolygonStyle(apartment)}
                onMouseEnter={() => setHoveredApartment(apartment.id)}
                onMouseLeave={() => setHoveredApartment(null)}
                onClick={() => handleApartmentClick(apartment)}
              />
            ))}
          </svg>
        </div>

        {/* Selected apartment info */}
        {selectedApartment && (
          <div className="mt-6 p-4 bg-gray-800 rounded text-white">
            <h3 className="font-semibold mb-2">Selected Apartment:</h3>
            <p>ID: {selectedApartment.id}</p>
            <p>Apartment Number: {selectedApartment.apartmentNumber}</p>
            <p>Floor: {selectedFloor}</p>
            <p>Coordinates: {selectedApartment.coords.substring(0, 60)}...</p>
            {selectedApartment.originalId && (
              <p className="text-gray-400">
                Original VR.ge ID: {selectedApartment.originalId}
              </p>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-800 rounded text-gray-300">
          <h3 className="font-semibold text-white mb-2">Instructions:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Select different floors to see how polygons scale</li>
            <li>Hover over apartments to highlight them</li>
            <li>Click on apartments to select them</li>
            <li>
              Adjust scaling parameters in the code to fine-tune positioning
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestFloorPolygons;
