'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ClientImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const ClientImage = ({ src, alt, width, height, priority = false }: ClientImageProps) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      onError={() => setIsError(true)}
    />
  );
};
