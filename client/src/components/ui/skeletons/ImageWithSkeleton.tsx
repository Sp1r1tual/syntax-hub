import { useState, CSSProperties } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string | undefined;
  wrapperClassName?: string;
  loading?: "lazy" | "eager";
  style?: CSSProperties;
}

export const ImageWithSkeleton = ({
  src,
  alt,
  width = 48,
  height = 48,
  borderRadius = 4,
  className,
  wrapperClassName,
  loading = "lazy",
  style,
}: ImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={wrapperClassName}
      style={{
        position: "relative",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        flexShrink: 0,
      }}
    >
      {isLoading && (
        <Skeleton
          width={width}
          height={height}
          borderRadius={borderRadius}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};
