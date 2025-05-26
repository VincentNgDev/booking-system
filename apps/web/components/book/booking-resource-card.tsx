"use client";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import ImageCard from "../card/image-card";
import { ChevronRight, CreditCard, MapPin, Star } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import ImageFallback from "../next-image/image-fallback";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RouteHelper } from "@/lib/route-helper";

type ResourceCardProps = {
  resourceId: string;
  image?: string;
  name: string;
  distance?: string;
  rating?: number;
  price?: string;
  amenities?: string[];
  resourceType?: string;
  location?: string;
  description?: string;
  noAction?: boolean; // Optional prop to disable action button
};

export default function BookingResourceCard({
  resourceId,
  image,
  name,
  distance,
  rating,
  price,
  amenities,
  resourceType,
  location,
  description,
  noAction = false, // Default to false if not provided
}: ResourceCardProps) {
  const router = useRouter();
  const { update } = useSession();

  async function handleOnSelectResource() {
    await update({ resourceId });

    router.push(
      RouteHelper.getRouteInfo({
        route: RouteHelper.bookingTime,
      })
    );
  }

  return (
    <ImageCard
      key={resourceId}
      src={image ?? "/images/placeholder.png"}
      alt={"Booking Category Image"}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{distance}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm">
            {rating} • {price}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {amenities &&
            amenities.map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
        </div>
      </CardContent>
      {!noAction && (
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mr-2">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>{resourceType} Facility</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className={cn(
                    "aspect-[2/1] relative rounded-md overflow-hidden",
                    "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
                  )}
                >
                  <ImageFallback
                    src={image ?? "/images/placeholder.png"}
                    alt={"Booking Category Image"}
                    fallbackSrc="/images/placeholder.png"
                    fill
                    className="object-contain rounded-t-lg"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Facility Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>{rating} out of 5 stars</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>{price}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <ul className="space-y-1 text-sm">
                      {amenities &&
                        amenities.map((amenity, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-primary" />
                            {amenity}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                {description && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button>Select This Facility</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="flex-1" onClick={handleOnSelectResource}>
            Select
          </Button>
        </CardFooter>
      )}
    </ImageCard>
  );
}
