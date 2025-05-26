"use client";

import { BookProvider } from "@/components/book/book-provider";
import BookingCurrentPage from "@/components/book/booking-current-page";
import { BookingProgress } from "@/components/book/booking-progress";
import PageTopPanel from "@/components/page-components/page-top-panel";
import PageContainer from "@/components/page-components/standard-page-container";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookProvider>
      <PageContainer>
        {/* Header */}
        <PageTopPanel
          title="Book a Resource"
          description="Find and reserve sports facilities in your area"
        />
        <BookingProgress
          steps={[
            { stepNumber: 1, stepName: "Select Category" },
            { stepNumber: 2, stepName: "Select Resource" },
            { stepNumber: 3, stepName: "Choose Time" },
            { stepNumber: 4, stepName: "Details" },
            { stepNumber: 5, stepName: "Confirmation" },
          ]}
        />
        <BookingCurrentPage>{children}</BookingCurrentPage>
      </PageContainer>
    </BookProvider>
  );
}
