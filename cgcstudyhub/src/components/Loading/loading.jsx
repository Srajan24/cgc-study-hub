import React from "react";
import Navbar from "../navbar/navbar";
import { Player } from "@lottiefiles/react-lottie-player";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      {/* Navbar stays fixed at top */}
      <Navbar />

      {/* Loader area */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center space-y-4">
        {/* Lottie Animation (responsive size) */}
        <Player
          autoplay
          loop
          src="/lottie/Loading.json"
          className="w-50 h-50 sm:w-52 sm:h-52 md:w-64 md:h-64"
        />

        {/* Branding text */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
          Loading StudyHub...
        </h1>

      </div>
    </div>
  );
}
