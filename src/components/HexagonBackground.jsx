import React from 'react';

const HexagonBackground = ({ color = "text-blue-500/10", className = "" }) => {
  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ contain: 'layout paint' }}
      aria-hidden="true"
    >
      <div className="absolute top-0 right-0 p-12 opacity-30">
        <div className={`relative w-96 h-96 hex-rotate ${color}`}>
            <svg viewBox="0 0 200 200" className="w-full h-full fill-current">
                <path d="M100,0 L186.6,50 L186.6,150 L100,200 L13.4,150 L13.4,50 Z" />
            </svg>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-8 opacity-20 transform rotate-180">
        <svg viewBox="0 0 100 100" className={`w-64 h-64 ${color}`}>
             <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z" />
             <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M50,10 L84.6,30 L84.6,70 L50,90 L15.4,70 L15.4,30 Z" />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(HexagonBackground);