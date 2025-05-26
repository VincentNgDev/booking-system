import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("categoryId");

  return NextResponse.json({
    date: [
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
    ],
  });
}
