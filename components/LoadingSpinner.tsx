import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-amber-400 rounded-full animate-spin [animation-duration:1.5s]"></div>
      </div>
      <p className="mt-4 text-orange-600 font-bold animate-pulse text-lg">
        かんがえちゅう...
      </p>
    </div>
  );
};

export default LoadingSpinner;
