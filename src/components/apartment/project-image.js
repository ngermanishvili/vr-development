import React from "react";
import FloorOverlay from "./FloorOverlay";

const ProjectImage = ({ onImageClick, isFullscreen, selectedBlock }) => {
  const getBlockImage = (block) => {
    console.log("Selected block:", block); // Debug
    if (block === "C1") {
      return "/choose-apartment/BLOCK-C-IMG.jpg";
    } else if (block === "B1") {
      return "/choose-apartment/BLOCK-B1-IMG.jpg";
    } else if (block === "B2") {
      return "/choose-apartment/BLOCK-B2-IMG.jpg";
    }

    // Default image for other blocks
    return "/choose-apartment/Block-Choose.jpg";
  };

  return (
    <div
      className={`${
        isFullscreen ? "h-screen" : "md:h-screen"
      } h-[400px] cursor-pointer relative`}
      onClick={onImageClick}
    >
      <img
        className="w-full h-full object-cover"
        src={getBlockImage(selectedBlock)}
        alt="Project Image"
      />
      <FloorOverlay selectedBlock={selectedBlock} />
    </div>
  );
};

export default ProjectImage;
