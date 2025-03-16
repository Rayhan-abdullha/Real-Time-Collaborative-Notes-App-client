import React from "react";

const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
  );
};

export default Skeleton;
