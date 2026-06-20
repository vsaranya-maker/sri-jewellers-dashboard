import React from 'react';

const GlassCard = ({ children, className = '', hover = false, goldBorder = false }) => {
  return (
    <div className={`
      rounded-2xl p-6 
      ${goldBorder ? 'glass-panel-gold shadow-glass-gold' : 'glass-panel shadow-glass'} 
      ${hover ? 'hover:-translate-y-1 hover:border-gold/30 hover:shadow-glass-gold/25 transition-all duration-300' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
