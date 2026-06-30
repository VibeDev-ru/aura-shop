import React from 'react';

const AuraLogo = ({ size = 40, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Внешний круг - аура */}
      <circle 
        cx="20" 
        cy="20" 
        r="18" 
        stroke="url(#auraGradient)" 
        strokeWidth="1.5"
        opacity="0.3"
      />
      
      {/* Второй круг - аура */}
      <circle 
        cx="20" 
        cy="20" 
        r="14" 
        stroke="url(#auraGradient)" 
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Основной круг */}
      <circle 
        cx="20" 
        cy="20" 
        r="10" 
        fill="url(#auraGradient)"
      />
      
      {/* Внутренняя точка */}
      <circle 
        cx="20" 
        cy="20" 
        r="3" 
        fill="white"
        opacity="0.9"
      />
      
      {/* Сияющие линии */}
      <g opacity="0.4">
        <line x1="20" y1="2" x2="20" y2="8" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        <line x1="20" y1="32" x2="20" y2="38" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        <line x1="2" y1="20" x2="8" y2="20" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        <line x1="32" y1="20" x2="38" y2="20" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        
        <line x1="5.36" y1="5.36" x2="9.88" y2="9.88" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        <line x1="30.12" y1="30.12" x2="34.64" y2="34.64" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        <line x1="5.36" y1="34.64" x2="9.88" y2="30.12" stroke="url(#auraGradient)" strokeWidth="1.5"/>
        <line x1="30.12" y1="9.88" x2="34.64" y2="5.36" stroke="url(#auraGradient)" strokeWidth="1.5"/>
      </g>
      
      {/* Градиенты */}
      <defs>
        <linearGradient id="auraGradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="100%" stopColor="#C084FC"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AuraLogo;