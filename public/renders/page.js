"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Import the scraped coordinate data
import scrapedFloorData from "../../../C-block-apartment-coords.json";

const TestFloorPolygons = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [hoveredApartment, setHoveredApartment] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [useScrapedData, setUseScrapedData] = useState(true);

  // Original Floor 1 coordinates (your manually drawn ones)

  // Get SVG transform for different floors with perspective correction
  const getSVGTransform = (floorNumber) => {
    if (floorNumber === 1) return "";

    // Perspective-based transformation
    // As we go up floors, we need to:
    // 1. Translate up (Y axis)
    // 2. Scale down slightly (perspective effect)
    // 3. Adjust for perspective vanishing point

    const floorHeight = floorNumber - 1;

    // Vertical translation: -24px base, with slight reduction for higher floors
    const verticalOffset = floorHeight * -24 + floorHeight * floorHeight * 0.3;

    // Scale factor: slight reduction as we go up (perspective effect)
    const scaleFactor = 1 - floorHeight * 0.0035;

    // Transform origin at center of building for proper scaling
    const transformOrigin = "960px 640px"; // Approximate center of the building

    return `translateY(${verticalOffset}px) scale(${scaleFactor})`;
  };

  // UNIVERSAL SOLUTION: Precise coordinate transformation based on image analysis
  const getUniversalTransform = (floorNumber) => {
    if (floorNumber === 1) return "";

    const floor = floorNumber - 1;

    // ANALYSIS OF FLOOR 1 vs FLOOR 2 IMAGES:
    // 1. Building rises vertically (primary movement)
    // 2. Slight perspective scaling (building gets minimally smaller with height)
    // 3. No horizontal shift needed
    // 4. Background elements (trees, landscape) remain static

    // CALIBRATED VALUES from your floor 4 working solution:
    // Floor 4: translate(0px, -67.3px) scale(0.95)
    // This gives us precise linear progression:

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
    if (useScrapedData && scrapedFloorData[floorNumber]) {
      // Use real scraped coordinates from VR.ge
      return scrapedFloorData[floorNumber];
    } else if (floorNumber === 1) {
      // Use your original Floor 1 coordinates
      return floor1Apartments;
    } else {
      // Fallback to transform method for floors without scraped data
      return floor1Apartments.map((apt) => ({
        ...apt,
        id: apt.id.replace("1", floorNumber.toString()),
        coords: apt.coords,
        floor: floorNumber,
      }));
    }
  };

  // Get the appropriate transform based on data source
  const getCurrentTransform = (floorNumber) => {
    if (useScrapedData && scrapedFloorData[floorNumber]) {
      // No transform needed when using real scraped coordinates
      return "";
    }
    // Use universal transform for Floor 1 and fallback cases
    return getUniversalTransform(floorNumber);
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
          Floor Polygon Scaling Test
        </h1>

        {/* Floor selector */}
        <div className="mb-6 flex gap-4">
          <label className="text-white">Select Floor:</label>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((floor) => (
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
            Total floors available: 1-12 (Floor 1: 16 apartments, Floors 2-11:
            19 each, Floor 12: 8 apartments)
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
            src={`/blocks/C-ჭრა ${selectedFloor} სართული.jpg`}
            alt={`Floor ${selectedFloor}`}
            width={1920}
            height={1080}
            className="max-w-full h-auto"
            priority
          />

          {/* SVG overlay for interactive polygons */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1280 720"
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
