import React from "react";

const Skeleton = ({ len, grid }: {len?: number,grid: string}) => {
  return (
    <div className={`w-full px-4 ${grid} mb-5`}>
      {[...Array(len || 10)].map((_, index) => (
        <div
          key={index}
          className="relative space-y-5 border border-gray-200 dark:border-gray-700 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-4 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-300/50 dark:via-gray-600/30 before:to-transparent"
        >
          <div className="h-[180px] rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-4/5 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-2/5 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
