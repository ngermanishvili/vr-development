"use client";
import React, { useState } from "react";

const KrtsanisiPortfolioOverlay = ({
  polygons,
  buildings,
  onBuildingClick,
}) => {
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    building: null,
  });
  const [debugMode, setDebugMode] = useState(false);

  // Convert HTML map coordinates to SVG polygon points
  const convertCoordsToPoints = (coords) => {
    if (!coords) return "";

    // Split coordinates and convert to x,y pairs
    const coordArray = coords.split(",").map(Number);
    const points = [];

    for (let i = 0; i < coordArray.length; i += 2) {
      if (i + 1 < coordArray.length) {
        points.push(`${coordArray[i]},${coordArray[i + 1]}`);
      }
    }

    return points.join(" ");
  };

  if (!polygons || polygons.length === 0) {
    return null;
  }


  return (
    <>
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/krtsanisi/portfolio/main.jpg"
          alt="VR Krtsanisi Portfolio"
          className="w-full h-full object-cover"
        />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1280 640"
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: "auto" }}
        >
          {polygons.map((polygon) => {
            if (!polygon.coords) return null;

            // Different types of polygons:
            // - 'standard': regular buildings that navigate to building details
            // - 'project': amenities/facilities that link to project pages
            // - 'tooltip': areas that only show tooltip, not clickable
            const isBuilding = polygon.navigation_type === "standard" && buildings.find((b) => b.building_id === polygon.area_id);
            const isProject = polygon.navigation_type === "project";
            const hasTooltip = polygon.has_tooltip === 1;
            const isClickable = polygon.is_clickable === 1 || isBuilding || isProject;

            return (
              <polygon
                key={polygon.id}
                points={convertCoordsToPoints(polygon.coords)}
                fill="transparent"
                stroke="transparent"
                strokeWidth="2"
                className={`transition-all duration-200 ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                }`}
                onMouseEnter={
                  hasTooltip
                    ? (e) => {
                        // Add SVG hover effects
                        e.target.style.fill = "#CA9B43";
                        e.target.style.fillOpacity = "0.7";
                        
                        setHoveredBuilding(polygon.area_id);
                        
                        // Show appropriate tooltip
                        if (isBuilding) {
                          const building = buildings.find((b) => b.building_id === polygon.area_id);
                          setTooltip({
                            visible: true,
                            x: e.clientX,
                            y: e.clientY,
                            building: building,
                          });
                        } else {
                          // For non-building polygons, show the building_name as tooltip
                          setTooltip({
                            visible: true,
                            x: e.clientX,
                            y: e.clientY,
                            building: { building_name: polygon.building_name },
                          });
                        }
                      }
                    : undefined
                }
                onMouseLeave={
                  hasTooltip
                    ? (e) => {
                        // Remove SVG hover effects
                        e.target.style.fill = "transparent";
                        
                        setHoveredBuilding(null);
                        setTooltip({ visible: false, x: 0, y: 0, building: null });
                      }
                    : undefined
                }
                onMouseMove={
                  hasTooltip
                    ? (e) => {
                        if (tooltip.visible) {
                          setTooltip((prev) => ({
                            ...prev,
                            x: e.clientX,
                            y: e.clientY,
                          }));
                        }
                      }
                    : undefined
                }
                onClick={
                  isClickable
                    ? (e) => {
                        e.stopPropagation();
                        
                        if (isBuilding) {
                          // Navigate to building details
                          const building = buildings.find((b) => b.building_id === polygon.area_id);
                          if (building && building.id) {
                            onBuildingClick(building.id);
                          }
                        } else if (isProject && polygon.href) {
                          // Navigate to project URL
                          window.location.href = polygon.href;
                        }
                      }
                    : undefined
                }
              />
            );
          })}
        </svg>

        {/* Simple debug info */}
        {debugMode && (
          <div className="absolute top-16 right-4 z-50 bg-black/80 text-white p-4 rounded text-sm max-w-xs">
            <div>SVG Polygons Active</div>
            <div>Polygons: {polygons.length}</div>
            <div>
              Buildings: {polygons.filter((p) => p.navigation_type === "standard").length}
            </div>
            <div>
              Projects: {polygons.filter((p) => p.navigation_type === "project").length}
            </div>
            <div>
              Tooltips: {polygons.filter((p) => p.navigation_type === "tooltip").length}
            </div>
            {hoveredBuilding && (
              <div className="mt-2 pt-2 border-t">
                <div>Hovered: {hoveredBuilding}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Debug toggle */}
      <button
        onClick={() => setDebugMode(!debugMode)}
        className="absolute top-4 right-4 z-50 bg-gray-600 text-white px-3 py-1 text-sm rounded"
      >
        {debugMode ? "Hide Info" : "Show Info"}
      </button>

      {/* Tooltip */}
      {tooltip.visible && tooltip.building && (
        <div
          className="fixed z-50 bg-black/90 text-white px-4 py-2 rounded-lg shadow-xl pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: "translate(0, -100%)",
          }}
        >
          <div className="font-semibold">{tooltip.building.building_name}</div>
          <div className="text-sm text-white/80">
            Buildings: {tooltip.building.total_blocks || 0} • Apartments:{" "}
            {tooltip.building.total_apartments || 0}
          </div>
          {tooltip.building.available_apartments !== undefined && (
            <div className="text-sm text-green-400">
              Available: {tooltip.building.available_apartments}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default KrtsanisiPortfolioOverlay;
