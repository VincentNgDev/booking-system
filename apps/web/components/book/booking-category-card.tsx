"use client";
import { cn } from "@workspace/ui/lib/utils";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import React from "react";
import ImageCard from "../card/image-card";
import { ResourceCategory } from "@/app/home/book/category/page";
import Link from "next/link";
import { RouteHelper } from "@/lib/route-helper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookingCategoryCard({
  category,
}: {
  category: ResourceCategory;
}) {
  const router = useRouter();
  const { update } = useSession();

  async function handleOnSelectCategory() {
    await update({ resourceCategoryId: category.id });

    router.push(
      RouteHelper.getRouteInfo({
        route: RouteHelper.bookingResource,
      })
    );
  }

  return (
    <ImageCard
      src={category.image ?? "/images/placeholder.png"}
      alt={"Booking Category Image"}
    >
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          onClick={handleOnSelectCategory}
        >
          Select
        </Button>
      </CardFooter>
    </ImageCard>
  );
}
