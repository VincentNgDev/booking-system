import { cn } from "@workspace/ui/lib/utils";

export default function SpinningSquareLoader({ size }: { size?: number }) {
  const squareSize = size ?? 80;
  const translateZ = squareSize / 2;

  return (
    <div
      style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
      className={cn(
        "animate-spinning-square transform-3d",
        "sub-div:bg-secondary/10 sub-div:h-full sub-div:w-full sub-div:absolute",
        "sub-div:border-solid sub-div:border-secondary",
        squareSize > 50
          ? "sub-div:border-[5px]"
          : squareSize > 30
            ? "sub-div:border-[3px]"
            : "sub-div:border-[2px]"
      )}
    >
      <div
        style={{ transform: `translateZ(-${translateZ}px)` }}
        className={cn("rotate-y-180")}
      ></div>
      <div
        className={cn("translate-x-[50%] rotate-y-90 origin-top-center")}
      ></div>
      <div
        className={cn("translate-x-[-50%] -rotate-y-90 origin-center-left")}
      ></div>
      <div
        className={cn("translate-y-[-50%] rotate-x-90 origin-top-center")}
      ></div>
      <div
        className={cn("translate-y-[50%] -rotate-x-90 origin-bottom-center")}
      ></div>
      <div style={{ transform: `translateZ(${translateZ}px)` }}></div>
    </div>
  );
}
