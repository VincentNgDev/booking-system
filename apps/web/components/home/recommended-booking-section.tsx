import { buttonVariants } from "@workspace/ui/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@workspace/ui/components/badge";
import ImageFallback from "../next-image/image-fallback";

async function getRecommended() {
  "use server";
  return [
    {
      id: 1,
      name: "Elite Tennis Club",
      type: "Tennis",
      rating: 4.8,
      distance: "1.2 miles away",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 2,
      name: "City Basketball Arena",
      type: "Basketball",
      rating: 4.6,
      distance: "0.8 miles away",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 3,
      name: "Fitness First Gym",
      type: "Gym",
      rating: 4.9,
      distance: "1.5 miles away",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 4,
      name: "Olympic Swimming Center",
      type: "Swimming",
      rating: 4.7,
      distance: "2.3 miles away",
      image: "/placeholder.svg?height=150&width=300",
    },
  ];
}

export async function RecommendedBookingSection() {
  const recommended = await getRecommended();
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recommended For You</h2>
        <Link
          href="/home"
          className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tennis">Tennis</TabsTrigger>
          <TabsTrigger value="basketball">Basketball</TabsTrigger>
          <TabsTrigger value="gym">Gym</TabsTrigger>
          <TabsTrigger value="swimming">Swimming</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recommended.map((resource) => (
              <Card key={resource.id} className={cn("py-0 pb-6")}>
                <div
                  className={cn(
                    "aspect-video relative",
                    "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
                  )}
                >
                  <ImageFallback
                    src={resource.image}
                    fallbackSrc="/images/placeholder.png"
                    alt={"Resource Image"}
                    fill
                    className="object-contain rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <Badge className="bg-primary">{resource.type}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{resource.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {resource.rating} • {resource.distance}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={`/book/${resource.id}`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full"
                    )}
                  >
                    Book Now
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* Other tabs would have similar content filtered by type */}
      </Tabs>
    </section>
  );
}
