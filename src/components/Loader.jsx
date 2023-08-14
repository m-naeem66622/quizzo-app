import React from "react";

const Loader = () => {
  return (
    <div className="fixed backdrop-blur-xs inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg p-8 text-center animate-bounce">
        <p className="text-2xl font-semibold mb-2 text-white">Hang Tight!</p>
        <p className="text-gray-300 text-lg font-medium">
          While We Get Questions From The{" "}
          <span className="text-green-400 font-semibold">Universe</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;
