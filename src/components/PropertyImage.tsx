import React, { useEffect, useState } from 'react';
import { DEFAULT_FALLBACK_PHOTO } from '../data/properties';

interface PropertyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const PropertyImage: React.FC<PropertyImageProps> = ({
  src,
  alt,
  className = 'h-[180px]',
}) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_FALLBACK_PHOTO);
  const [failedCompletely, setFailedCompletely] = useState(false);

  useEffect(() => {
    setImgSrc(src || DEFAULT_FALLBACK_PHOTO);
    setFailedCompletely(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== DEFAULT_FALLBACK_PHOTO) {
      setImgSrc(DEFAULT_FALLBACK_PHOTO);
    } else {
      setFailedCompletely(true);
    }
  };

  if (failedCompletely) {
    return (
      <div
        className={`w-full bg-zinc-200 flex flex-col items-center justify-center text-zinc-500 px-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-8 h-8 mb-1.5 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
          <path d="M9 21V13h6v8" />
        </svg>
        <span className="text-xs font-medium line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="eager"
      referrerPolicy="no-referrer"
      onError={handleError}
      style={{
        width: '100%',
        objectFit: 'cover',
        display: 'block',
        backgroundColor: '#ddd',
      }}
      className={className}
    />
  );
};
