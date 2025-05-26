import { auth } from "@/auth";
import BookingResourceCard from "@/components/book/booking-resource-card";
import ImageCard from "@/components/card/image-card";
import ImageFallback from "@/components/next-image/image-fallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { Slider } from "@workspace/ui/components/slider";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronRight, CreditCard, MapPin, Search, Star } from "lucide-react";

async function getResources() {
  const session = await auth();
  const selectedResouceCategoryId = session?.user?.resourceCategoryId;
  console.log("Booking Resource:", selectedResouceCategoryId);

  // Filter resources based on searchParams if needed

  return [
    {
      id: 1,
      name: "Downtown Tennis Club",
      type: "Tennis",
      location: "123 Main St, Cityville",
      distance: "1.2 miles away",
      rating: 4.8,
      price: "$25/hour",
      amenities: ["Locker Rooms", "Pro Shop", "Coaching Available"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      name: "Riverside Basketball Arena",
      type: "Basketball",
      location: "456 River Rd, Townsville",
      distance: "0.8 miles away",
      rating: 4.6,
      price: "$40/hour",
      amenities: ["Spectator Seating", "Scoreboard", "Changing Rooms"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      name: "Aquatic Center",
      type: "Swimming",
      location: "789 Ocean Ave, Beachtown",
      distance: "2.3 miles away",
      rating: 4.7,
      price: "$15/hour",
      amenities: ["Olympic Pool", "Diving Boards", "Sauna"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      name: "City Sports Complex",
      type: "Soccer",
      location: "202 Field Ave, Sportstown",
      distance: "1.5 miles away",
      rating: 4.5,
      price: "$60/hour",
      amenities: ["Full-size Field", "Floodlights", "Changing Rooms"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      name: "Fitness First Gym",
      type: "Gym",
      location: "505 Muscle Ave, Strengthville",
      distance: "1.8 miles away",
      rating: 4.9,
      price: "$15/hour",
      amenities: ["Free Weights", "Cardio Equipment", "Personal Training"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      name: "Wellness Yoga Studio",
      type: "Yoga",
      location: "101 Zen St, Calmville",
      distance: "0.5 miles away",
      rating: 4.8,
      price: "$18/hour",
      amenities: ["Mats Provided", "Meditation Room", "Shower Facilities"],
      image: "/placeholder.svg?height=200&width=400",
    },
  ];
}

export default async function ResourcePage() {
  const resourceList = await getResources();
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid gap-4 md:grid-cols-[1fr_250px]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Near Me
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Available Today
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Top Rated
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Lowest Price
            </Badge>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-primary"
            >
              Reset
            </Button>
          </div>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="sport-type">
              <AccordionTrigger className="text-sm">
                Sport Type
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tennis" />
                    <Label htmlFor="tennis">Tennis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="basketball" />
                    <Label htmlFor="basketball">Basketball</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="swimming" />
                    <Label htmlFor="swimming">Swimming</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="soccer" />
                    <Label htmlFor="soccer">Soccer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gym" />
                    <Label htmlFor="gym">Gym</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="yoga" />
                    <Label htmlFor="yoga">Yoga</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price-range">
              <AccordionTrigger className="text-sm">
                Price Range
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider defaultValue={[50]} max={100} step={1} />
                  <div className="flex items-center justify-between">
                    <span className="text-xs">$0</span>
                    <span className="text-xs">$100+</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="distance">
              <AccordionTrigger className="text-sm">Distance</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="5miles">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1mile" id="1mile" />
                    <Label htmlFor="1mile">Within 1 mile</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5miles" id="5miles" />
                    <Label htmlFor="5miles">Within 5 miles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10miles" id="10miles" />
                    <Label htmlFor="10miles">Within 10 miles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="25miles" id="25miles" />
                    <Label htmlFor="25miles">Within 25 miles</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="amenities">
              <AccordionTrigger className="text-sm">Amenities</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parking" />
                    <Label htmlFor="parking">Parking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="locker-rooms" />
                    <Label htmlFor="locker-rooms">Locker Rooms</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="showers" />
                    <Label htmlFor="showers">Showers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="equipment-rental" />
                    <Label htmlFor="equipment-rental">Equipment Rental</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="coaching" />
                    <Label htmlFor="coaching">Coaching Available</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button className="w-full">Apply Filters</Button>
        </div>
      </div>

      {/* Resource List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resourceList.map((resource) => (
          <BookingResourceCard
            key={resource.id}
            name={resource.name}
            resourceId={resource.id.toString()}
            image={resource.image}
            distance={resource.distance}
            rating={resource.rating}
            price={resource.price}
            amenities={resource.amenities}
            resourceType={resource.type}
            location={resource.location}
            description={
              "This is a great facility for playing " +
              resource.type.toLowerCase() +
              "."
            }
          />
        ))}
      </div>
    </div>
  );
}
