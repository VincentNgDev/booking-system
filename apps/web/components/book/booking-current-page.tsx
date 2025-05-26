"use client";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useBook } from "./book-provider";
import React from "react";
import Link from "next/link";

export default function BookingCurrentPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { prevStep, canGoBack } = useBook();

  return (
    <div className={cn("space-y-6 py-6")}>
      {canGoBack && (
        <Link
          href={prevStep!.route}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mb-4"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      )}
      {children}
    </div>
  );
}
