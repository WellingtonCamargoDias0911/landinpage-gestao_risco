import React from 'react';

// CSS-only implementation for better performance
const GraphBackground = ({ color = "#3b82f6" }) => {
  // Generate static nodes positions to avoid re-calculation
  const nodes = React.useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${10 + Math.random() * 10}s`
  })), []);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 content-visibility-auto" 
      style={{ contain: 'layout paint' }}
      aria-hidden="true"
    >
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full graph-node"
          style={{
            left: node.left,
            top: node.top,
            width: '4px',
            height: '4px',
            backgroundColor: color,
            animationDelay: node.animationDelay,
            animationDuration: node.animationDuration,
            opacity: 0.2
          }}
        />
      ))}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/90" 
        style={{ willChange: 'opacity' }}
      ></div>
    </div>
  );
};

export default React.memo(GraphBackground);