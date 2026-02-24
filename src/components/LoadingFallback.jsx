import React from 'react';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-800 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  </div>
);

export default LoadingFallback;