"use client";

import { RouteHelper } from "@/lib/route-helper";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type BookingStepInfo = {
  stepNumber: number;
  route: string;
};

type BookContextType = {
  currentStep?: BookingStepInfo;
  prevStep?: BookingStepInfo;
  nextStep?: BookingStepInfo;
  canGoBack: boolean;
};

export type SelectedResourceCategory = {
  id: string;
  name: string;
};

const BookContext = React.createContext<BookContextType | undefined>(undefined);

export function useBook() {
  const context = React.useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
}

export function BookProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const bookingStepInfo = React.useMemo<BookingStepInfo[]>(() => {
    return [
      { stepNumber: 1, route: RouteHelper.bookingResourceCategory },
      { stepNumber: 2, route: RouteHelper.bookingResource },
      { stepNumber: 3, route: RouteHelper.bookingTime },
      { stepNumber: 4, route: RouteHelper.bookingDetails },
      { stepNumber: 5, route: RouteHelper.bookingConfirmation },
    ];
  }, []);

  const [canGoBack, setCanGoBack] = React.useState<boolean>(false);

  const [currentStep, setCurrentStep] = React.useState<
    BookingStepInfo | undefined
  >(undefined);
  const [prevStep, setPrevStep] = React.useState<BookingStepInfo | undefined>(
    undefined
  );
  const [nextStep, setNextStep] = React.useState<BookingStepInfo | undefined>(
    undefined
  );

  React.useEffect(() => {
    const current = bookingStepInfo.find((step) => step.route === pathName);
    if (current) {
      setCurrentStep(current);

      const previous = bookingStepInfo.find(
        (step) => step.stepNumber === current.stepNumber - 1
      );

      const next = bookingStepInfo.find(
        (step) => step.stepNumber === current.stepNumber + 1
      );

      setPrevStep(previous);
      setNextStep(next);

      setCanGoBack(!!previous);
    }
  }, [pathName]);

  const context = React.useMemo(() => {
    return {
      currentStep,
      prevStep,
      nextStep,
      canGoBack,
    };
  }, [currentStep, prevStep, nextStep, canGoBack]);

  return (
    <BookContext.Provider value={context}>{children}</BookContext.Provider>
  );
}
