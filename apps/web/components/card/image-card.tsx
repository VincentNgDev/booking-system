import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import ImageFallback from "../next-image/image-fallback";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Badge } from "@workspace/ui/components/badge";

export default function ImageCard({
  src,
  alt,
  children,
  badge,
}: {
  src: string | StaticImport;
  alt: string;
  children?: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <Card className={cn("overflow-hidden", "py-0 pb-6")}>
      <div
        className={cn(
          "aspect-[2/1] relative",
          "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
        )}
      >
        <ImageFallback
          src={src}
          fallbackSrc="/images/placeholder.png"
          alt={alt}
          fill
          className="object-contain rounded-t-lg"
        />
        {badge && <div className="absolute top-2 right-2">{badge}</div>}
      </div>
      {children}
    </Card>
  );
}
