"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/landing/Header/Header";
import BackButton from "@/components/ui/BackButton";

const KrtsanisiBuildingPage = () => {
  const params = useParams();
  const router = useRouter();
  const buildingId = params.building_id;

  const [building, setBuilding] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (buildingId) {
      fetchBuildingData();
    }
  }, [buildingId]);

  const fetchBuildingData = async () => {
    try {
      setLoading(true);

      // Fetch building details, blocks, and statistics
      const [buildingsResponse, blocksResponse, statsResponse] =
        await Promise.all([
          fetch("/api/krtsanisi/buildings"),
          fetch(`/api/krtsanisi/blocks?building_id=${buildingId}`),
          fetch(`/api/krtsanisi/statistics?building_id=${buildingId}`),
        ]);

      const [buildingsData, blocksData, statsData] = await Promise.all([
        buildingsResponse.json(),
        blocksResponse.json(),
        statsResponse.json(),
      ]);

      if (buildingsData.success) {
        const buildingData = buildingsData.data.find((b) => b.id == buildingId);
        setBuilding(buildingData);
      }

      if (blocksData.success) {
        setBlocks(blocksData.data);
      }

      if (statsData.success) {
        setStatistics(statsData.data);
      }
    } catch (error) {
      console.error("Error fetching building data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockClick = (blockId) => {
    router.push(`/krtsanisi/block/${buildingId}/${blockId}`);
  };

  const getBuildingImagePath = () => {
    if (!building) return "/krtsanisi/portfolio/main.jpg";

    // Check if we have an image for this building_id
    const buildingCode = building.building_id;
    const imageExtensions = ["jpg", "jpeg", "png"];

    // For now, return a fallback. In production, you'd check which files exist
    return `/krtsanisi/buildings/${buildingCode}.jpg`;
  };

  if (loading) {
    return (
      <div className="relative">
        <Header />
        <div className="pt-24 flex items-center justify-center h-screen">
          <div className="text-xl">Loading building details...</div>
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div className="relative">
        <Header />
        <div className="pt-24 flex items-center justify-center h-screen">
          <div className="text-xl text-red-600">Building not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />
      <div className="pt-24 relative w-full h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${getBuildingImagePath()})` }}
        >
          <div className="absolute inset-0 "></div>
        </div>

        {/* Back button */}
        <div className="absolute top-28 left-4 z-20">
          <BackButton onClick={() => router.push("/krtsanisi")} />
        </div>

        {/* Building info overlay */}
        <div className="absolute top-28 right-8 z-20 bg-black/80 text-white p-6 rounded-lg max-w-md">
          <h1 className="text-2xl font-bold mb-2">{building.building_name}</h1>
          <div className="space-y-2 text-sm">
            <div>Building ID: {building.building_id}</div>
            <div>Total Blocks: {building.total_blocks || 0}</div>
            <div>Total Apartments: {building.total_apartments || 0}</div>
            {statistics && (
              <>
                <div className="text-green-400">
                  Available: {statistics.overall.available || 0}
                </div>
                <div className="text-red-400">
                  Likely Sold: {statistics.overall.likely_sold || 0}
                </div>
              </>
            )}
            <div className="text-gray-300">Status: {building.status}</div>
          </div>
        </div>

        {/* Blocks grid overlay */}
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <h2 className="text-white text-xl font-semibold mb-4">
            Select Block:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-64 overflow-y-auto">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => handleBlockClick(block.id)}
                className="bg-black/80 hover:bg-blue-600/80 text-white p-4 rounded-lg transition-colors border border-white/20 hover:border-blue-400"
              >
                <div className="font-semibold">{block.block_name}</div>
                <div className="text-sm text-gray-300">
                  Block {block.block_number}
                </div>
                <div className="text-xs mt-1">
                  <div className="text-green-400">
                    {block.available_apartments || 0} available
                  </div>
                  <div className="text-red-400">
                    {block.likely_sold_apartments || 0} sold
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrtsanisiBuildingPage;
