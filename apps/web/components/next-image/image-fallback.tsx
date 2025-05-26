"use client";
import { ImageProps } from "next/image";
import Image from "next/image";
import React from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

export default function ImageFallback({
  src,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleLoadingComplete = React.useCallback(
    (img: HTMLImageElement) => {
      if (img.naturalWidth === 0) {
        setImgSrc(fallbackSrc);
      }
    },
    [setImgSrc]
  );

  const handleError = React.useCallback(() => {
    setImgSrc(fallbackSrc);
  }, [setImgSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      onLoadingComplete={handleLoadingComplete}
      onError={handleError}
    />
  );
}
