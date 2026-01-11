import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MarkdownImage = ({
  src,
  alt,
}: {
  src?: string | undefined;
  alt?: string | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <span
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      {isLoading && (
        <Skeleton
          height={500}
          style={{
            borderRadius: "8px",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease",
          display: "block",
          width: "100%",
        }}
      />
    </span>
  );
};
