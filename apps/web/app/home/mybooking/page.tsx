import { auth } from "@/auth";
import {
  MyBookingProvider,
  MyBookings,
  MyBookingsLayout,
  MyBookingsViewSwitcher,
} from "@/components/mybooking/mybookings";
import PageTopPanel from "@/components/page-components/page-top-panel";
import PageContainer from "@/components/page-components/standard-page-container";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Filter, Plus, Search } from "lucide-react";

async function getUpcomingBookings(): Promise<MyBookings[]> {
  return [
    {
      id: "1",
      resource: "Tennis Court",
      location: "Downtown Sports Center",
      address: "123 Main St, Cityville",
      date: "Today",
      time: "3:00 PM - 4:30 PM",
      status: "confirmed",
      participants: 2,
      price: "$25.00",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "2",
      resource: "Basketball Court",
      location: "Riverside Gym",
      address: "456 River Rd, Townsville",
      date: "Tomorrow",
      time: "6:00 PM - 7:30 PM",
      status: "confirmed",
      participants: 10,
      price: "$40.00",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "3",
      resource: "Swimming Pool",
      location: "Aquatic Center",
      address: "789 Ocean Ave, Beachtown",
      date: "May 3, 2025",
      time: "10:00 AM - 11:00 AM",
      status: "pending",
      participants: 1,
      price: "$15.00",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "4",
      resource: "Yoga Studio",
      location: "Wellness Center",
      address: "101 Zen St, Calmville",
      date: "May 5, 2025",
      time: "7:00 AM - 8:00 AM",
      status: "confirmed",
      participants: 1,
      price: "$18.00",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "5",
      resource: "Soccer Field",
      location: "City Sports Complex",
      address: "202 Field Ave, Sportstown",
      date: "May 10, 2025",
      time: "4:00 PM - 6:00 PM",
      status: "confirmed",
      participants: 22,
      price: "$120.00",
      image: "/placeholder.svg?height=100&width=200",
    },
  ];
}
async function getPastBookings(): Promise<MyBookings[]> {
  return [
    {
      id: "6",
      resource: "Tennis Court",
      location: "Downtown Sports Center",
      address: "123 Main St, Cityville",
      date: "April 25, 2025",
      time: "2:00 PM - 3:30 PM",
      status: "completed",
      participants: 2,
      price: "$25.00",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "7",
      resource: "Gym Session",
      location: "Fitness First",
      address: "505 Muscle Ave, Strengthville",
      date: "April 20, 2025",
      time: "8:00 AM - 9:30 AM",
      status: "completed",
      participants: 1,
      price: "$15.00",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "8",
      resource: "Basketball Court",
      location: "Riverside Gym",
      address: "456 River Rd, Townsville",
      date: "April 15, 2025",
      time: "7:00 PM - 8:30 PM",
      status: "completed",
      participants: 10,
      price: "$40.00",
      image: "/placeholder.svg?height=100&width=200",
    },
  ];
}

export default async function MyBookingPage() {
  const upcomingBookings = await getUpcomingBookings();
  const pastBookings = await getPastBookings();

  return (
    <MyBookingProvider>
      <PageContainer>
        {/* Header */}
        <PageTopPanel
          title="My Bookings"
          description="Manage all your resource reservations"
          renderSideComponent={() => {
            return (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            );
          }}
        />

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Date (Newest First)</DropdownMenuItem>
                <DropdownMenuItem>Date (Oldest First)</DropdownMenuItem>
                <DropdownMenuItem>Price (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Price (Low to High)</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Facility Type</DropdownMenuLabel>
                <DropdownMenuItem>Tennis</DropdownMenuItem>
                <DropdownMenuItem>Basketball</DropdownMenuItem>
                <DropdownMenuItem>Swimming</DropdownMenuItem>
                <DropdownMenuItem>Gym</DropdownMenuItem>
                <DropdownMenuItem>Yoga</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <MyBookingsViewSwitcher />
          </div>
        </div>

        {/* Bookings List */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <MyBookingsLayout bookings={upcomingBookings} />
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <MyBookingsLayout bookings={pastBookings} />
          </TabsContent>
        </Tabs>
      </PageContainer>
    </MyBookingProvider>
  );
}
