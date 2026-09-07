"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export const AppImage: React.FC<ImageProps> = ({ src, alt, onError, ...props }) => {
  const initialSrc = typeof src === "string" ? getAssetPath(src) : src;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasRetried, setHasRetried] = useState(false);

  useEffect(() => {
    setImgSrc(typeof src === "string" ? getAssetPath(src) : src);
    setHasRetried(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasRetried && typeof src === "string") {
      setHasRetried(true);
      // If failed without /Prabhusah, try with /Prabhusah
      if (!imgSrc.toString().includes("/Prabhusah/")) {
        setImgSrc(`/Prabhusah${src.startsWith("/") ? "" : "/"}${src}`);
        return;
      }
      // If failed with /Prabhusah, try without /Prabhusah
      if (imgSrc.toString().includes("/Prabhusah/")) {
        setImgSrc(src.startsWith("/") ? src : `/${src}`);
        return;
      }
    }
    if (onError) {
      onError(e);
    }
  };

  return <Image src={imgSrc} alt={alt} onError={handleError} {...props} />;
};
