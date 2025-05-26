"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useBook } from "./book-provider";

type BookingProgressProps = {
  steps: { stepNumber: number; stepName: string }[];
};

export function BookingProgress({ steps }: BookingProgressProps) {
  const { currentStep } = useBook();
  return (
    steps.length > 0 && (
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2" />
        <div className="relative flex justify-between">
          {steps.map((step) => {
            return (
              <div
                key={step.stepName + step.stepNumber}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border",
                    currentStep && currentStep?.stepNumber >= step.stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {step.stepNumber}
                </div>
                <span className="text-xs font-medium">{step.stepName}</span>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
