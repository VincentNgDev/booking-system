import { Button } from "@workspace/ui/components/button";
import ImageFallback from "../next-image/image-fallback";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "@workspace/ui/lib/utils";

export type ButtonImage = {
  src: string | StaticImport;
  alt: string;
  height: number;
  width: number;
};

export default function ButtonWithIconImage({
  image,
  children,
  buttonText,
  className
}: {
  image?: ButtonImage;
  children?: React.ReactNode;
  buttonText: string;
  className?: string;
}) {
  return (
    <Button className={cn(className)}>
      {image && (
        <ImageFallback
          src={image.src}
          fallbackSrc="/images/placeholder.png"
          alt={image.alt}
          height={image.height}
          width={image.width}
        />
      )}
      {children}
      {buttonText}
    </Button>
  );
}
