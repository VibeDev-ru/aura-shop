import React from 'react';

const TelegramIcon = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.264 2.427L2.284 9.847C1.184 10.287 1.19 10.947 2.084 11.227L6.954 12.857L19.604 5.857C20.054 5.587 20.464 5.734 20.124 6.034L9.854 15.227L9.524 19.447C9.934 19.447 10.114 19.267 10.344 19.047L12.704 16.767L17.594 20.347C18.454 20.847 19.074 20.587 19.294 19.567L22.844 4.047C23.164 2.817 22.384 2.257 22.264 2.427Z"
        fill="#0088cc"
      />
    </svg>
  );
};

export default TelegramIcon;