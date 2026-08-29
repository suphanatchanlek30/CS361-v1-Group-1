import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm animate-pulse flex flex-col gap-3"
        >
          <div className="w-full aspect-[3/4] bg-gray-200 rounded-md" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mt-1" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-5/6 mt-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-auto pt-2" />
        </div>
      ))}
    </div>
  );
};