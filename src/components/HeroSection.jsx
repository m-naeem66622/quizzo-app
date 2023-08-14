import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 mb-4">
            Quizzo
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-6">
            Test your knowledge in the universe of Quizzo
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
