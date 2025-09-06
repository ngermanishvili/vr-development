"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing/Header/Header";
import KrtsanisiPortfolioOverlay from "@/components/krtsanisi/PortfolioOverlay";

const KrtsanisiPortfolioPage = () => {
  const [polygons, setPolygons] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both polygons and buildings data
      const [polygonsResponse, buildingsResponse] = await Promise.all([
        fetch("/api/krtsanisi/polygons"),
        fetch("/api/krtsanisi/buildings"),
      ]);

      const [polygonsData, buildingsData] = await Promise.all([
        polygonsResponse.json(),
        buildingsResponse.json(),
      ]);

      if (polygonsData.success) {
        setPolygons(polygonsData.data);
      }
      if (buildingsData.success) {
        setBuildings(buildingsData.data);
      }
    } catch (error) {
      console.error("Error fetching Krtsanisi data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingClick = (buildingId) => {
    router.push(`/krtsanisi/building/${buildingId}`);
  };

  return (
    <div className="relative">
      <Header />
      <div className="pt-24 relative w-full h-screen">
        {/* Full screen background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/krtsanisi/portfolio/main.jpg)" }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0"></div>
        </div>

        {/* Interactive overlay */}
        <div className="relative z-10 h-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-xl">
                Loading Krtsanisi Portfolio...
              </div>
            </div>
          ) : (
            <KrtsanisiPortfolioOverlay
              polygons={polygons}
              buildings={buildings}
              onBuildingClick={handleBuildingClick}
            />
          )}
        </div>

        {/* Project title overlay */}
        <div className="absolute bottom-8 left-8 z-20">
          <h1 className="text-white text-4xl font-bold mb-2">VR Krtsanisi</h1>
          <p className="text-white/90 text-lg">
            კრწანისი რეზიდენსი - თანამედროვე საცხოვრებელი კომპლექსი
          </p>
        </div>
      </div>
    </div>
  );
};

export default KrtsanisiPortfolioPage;
