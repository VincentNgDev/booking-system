"use server";

import { auth } from "@/auth";

async function setResourceBookingSession({
  categoryId,
  resourceId,
}: {
  categoryId?: string;
  resourceId?: string;
}) {
  const session = await auth();

  if (session !== null) {
    const bookingResource = session.user.resourceBooking;
    const preCategoryId = bookingResource?.resourceCategoryId ?? "";
    const preResourceId = bookingResource?.resourceId ?? "";

    session.user.resourceBooking = {
      resourceCategoryId: categoryId ?? preCategoryId,
      resourceId: resourceId ?? preResourceId,
    };
  }

  console.log("setssss", session);
}

export async function resourceCategoryAction(categoryId: string) {
  await setResourceBookingSession({
    categoryId,
  });
}

export async function resourceAction(resourceId: string) {
  await setResourceBookingSession({
    resourceId,
  });
}
