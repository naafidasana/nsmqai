"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ShimmerPlaceholder from "./shimmer";
import Image from "next/image";
import ImagePlaceholder from "@/assets/images/image-placeholder.jpg";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Track mute state

  const handleReady = () => {
    setIsReady(false);
  };

  const handleError = () => {
    setError(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted); // Toggle between mute and unmute
  };

  return (
    <div className="relative flex flex-col max-w-full h-[47vh] rounded-md overflow-hidden shadow-lg md:shadow-gray-500 shadow-gray-200">
      <div
        className="flex flex-col md:flex-row max-w-full h-[47vh] relative overflow-hidden"
        style={
          !isReady
            ? {
                borderImage: "linear-gradient(45deg, blue, red) 1",
                animation: "gradient-border 3s ease infinite",
                borderWidth: "3px",
                borderStyle: "solid",
              }
            : {}
        }
      >
        {error ? (
          <ShimmerPlaceholder />
        ) : (
          <>
            {!url && (
              <div className="w-full bg-gradient-to-r from-purple-200 via-purple-300 to-blue-200 bg-bottom grid place-items-center h-full">
                <p className="text-[32px] md:text-[60px] font-bold text-white">
                  Brilla AI
                </p>
              </div>
            )}
            {isReady && url && <ShimmerPlaceholder />}
            {url && (
              <>
                <ReactPlayer
                  url={url}
                  width="100%"
                  height="100%"
                  controls={false}
                  playing={true}
                  muted={isMuted}
                  volume={0.5}
                  onReady={handleReady}
                  onError={handleError}
                  style={{ pointerEvents: "none" }}
                />
                {/* Mute/Unmute Toggle Button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded"
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
