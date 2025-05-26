import { Badge } from "@workspace/ui/components/badge";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImageFallback from "../next-image/image-fallback";

async function getUpcomingBookings() {
  "use server";
  return [
    {
      id: 1,
      facility: "Tennis Court",
      location: "Downtown Sports Center",
      date: "Today",
      time: "3:00 PM - 4:30 PM",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      facility: "Basketball Court",
      location: "Riverside Gym",
      date: "Tomorrow",
      time: "6:00 PM - 7:30 PM",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      facility: "Swimming Pool",
      location: "Aquatic Center",
      date: "May 3, 2025",
      time: "10:00 AM - 11:00 AM",
      image: "/placeholder.svg?height=100&width=200",
    },
  ];
}

export async function UpcomingBookingsSection() {
  const upcomingBookings = await getUpcomingBookings();
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Upcoming Bookings</h2>
        <Link
          href="/home"
          className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcomingBookings.map((booking) => (
          <Card key={booking.id} className={cn("py-0 pb-6")}>
            <div
              className={cn(
                "aspect-[2/1] relative",
                "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
              )}
            >
              <ImageFallback
                src={booking.image}
                fallbackSrc="/images/placeholder.png"
                alt={"Booking Image"}
                fill
                className="object-contain rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{booking.date}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{booking.facility}</CardTitle>
              <CardDescription>{booking.location}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{booking.time}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Reschedule
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
