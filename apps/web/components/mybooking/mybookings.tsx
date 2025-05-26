"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import React from "react";
import Image from "next/image";
import { Badge } from "@workspace/ui/components/badge";
import {
  Calendar,
  Clock,
  MapPin,
  SlidersHorizontal,
  Users,
} from "lucide-react";
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
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import ImageFallback from "../next-image/image-fallback";
import { cn } from "@workspace/ui/lib/utils";

export type MyBookings = {
  id?: string;
  resource?: string;
  location?: string;
  address?: string;
  date?: string;
  time?: string;
  status?: string;
  participants?: number;
  price?: string;
  image?: string;
};

type MyBookingContextType = {
  viewType: "list" | "grid";
  setViewType: (viewState: "list" | "grid") => void;
  upcomingBookings: MyBookings[];
  setUpcomingBookings: (bookings: MyBookings[]) => void;
  pastBookings: MyBookings[];
  setPastBookings: (bookings: MyBookings[]) => void;
};

const MyBookingContext = React.createContext<MyBookingContextType | undefined>(
  undefined
);

const useMyBookings = () => {
  const context = React.useContext(MyBookingContext);
  if (!context) {
    throw new Error(
      "useMyBookingLayout must be used within a MyBookingLayoutProvider"
    );
  }
  return context;
};

export function MyBookingProvider({ children }: { children: React.ReactNode }) {
  const [viewType, setViewType] = React.useState<"list" | "grid">("grid");

  const [upcomingBookings, setUpcomingBookings] = React.useState<MyBookings[]>(
    []
  );
  const [pastBookings, setPastBookings] = React.useState<MyBookings[]>([]);

  const context = React.useMemo(() => {
    return {
      viewType,
      setViewType,
      upcomingBookings,
      setUpcomingBookings,
      pastBookings,
      setPastBookings,
    };
  }, [
    viewType,
    setViewType,
    upcomingBookings,
    setUpcomingBookings,
    pastBookings,
    setPastBookings,
  ]);

  return (
    <MyBookingContext.Provider value={context}>
      {children}
    </MyBookingContext.Provider>
  );
}

export function MyBookingsLayout({ bookings }: { bookings: MyBookings[] }) {
  const { viewType } = useMyBookings();

  return viewType === "grid"
    ? MyBookingGridView(bookings)
    : MyBookingListView(bookings);
}

function MyBookingGridView(bookings: MyBookings[]) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.length > 0
        ? bookings.map((booking) => {
            return (
              <Card
                key={booking.id}
                className={cn("overflow-hidden", "py-0 pb-6")}
              >
                <div
                  className={cn(
                    "aspect-[2/1] relative",
                    "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
                  )}
                >
                  <ImageFallback
                    src={booking.image ?? ""}
                    fallbackSrc="/images/placeholder.png"
                    alt={"Booking Image"}
                    fill
                    className="object-contain rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {booking.status === "confirmed"
                        ? "Confirmed"
                        : booking.status === "pending"
                          ? "Pending"
                          : "Completed"}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{booking.resource}</span>
                    <Badge variant="outline">{booking.date}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div>{booking.location}</div>
                      <div className="text-muted-foreground text-xs">
                        {booking.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {booking.participants} participant
                      {booking.participants !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{booking.price}</div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        Reschedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reschedule Booking</DialogTitle>
                        <DialogDescription>
                          Change the date and time for your {booking.resource}{" "}
                          reservation.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">New Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">New Time</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9am">
                                9:00 AM - 10:00 AM
                              </SelectItem>
                              <SelectItem value="10am">
                                10:00 AM - 11:00 AM
                              </SelectItem>
                              <SelectItem value="11am">
                                11:00 AM - 12:00 PM
                              </SelectItem>
                              <SelectItem value="12pm">
                                12:00 PM - 1:00 PM
                              </SelectItem>
                              <SelectItem value="1pm">
                                1:00 PM - 2:00 PM
                              </SelectItem>
                              <SelectItem value="2pm">
                                2:00 PM - 3:00 PM
                              </SelectItem>
                              <SelectItem value="3pm">
                                3:00 PM - 4:00 PM
                              </SelectItem>
                              <SelectItem value="4pm">
                                4:00 PM - 5:00 PM
                              </SelectItem>
                              <SelectItem value="5pm">
                                5:00 PM - 6:00 PM
                              </SelectItem>
                              <SelectItem value="6pm">
                                6:00 PM - 7:00 PM
                              </SelectItem>
                              <SelectItem value="7pm">
                                7:00 PM - 8:00 PM
                              </SelectItem>
                              <SelectItem value="8pm">
                                8:00 PM - 9:00 PM
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Confirm Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        Cancel
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Booking</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your{" "}
                          {booking.resource} reservation?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="rounded-lg border p-4">
                          <div className="font-medium">{booking.resource}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.location}
                          </div>
                          <div className="text-sm">
                            {booking.date} • {booking.time}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Cancellations made at least 24 hours in advance will
                          receive a full refund. Later cancellations may be
                          subject to a cancellation fee.
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Keep Booking</Button>
                        <Button variant="destructive">Cancel Booking</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            );
          })
        : NoBookings()}
    </div>
  );
}

function MyBookingListView(bookings: MyBookings[]) {
  return (
    <div className="space-y-4">
      {bookings.length > 0
        ? bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border"
            >
              <div
                className={cn(
                  "relative h-20 w-32 rounded-md overflow-hidden shrink-0",
                  "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
                )}
              >
                <ImageFallback
                  src={booking.image ?? ""}
                  fallbackSrc="/images/placeholder.png"
                  alt={"Booking Image"}
                  fill
                  className="object-contain rounded-t-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{booking.resource}</h3>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "pending"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {booking.status === "confirmed"
                          ? "Confirmed"
                          : booking.status === "pending"
                            ? "Pending"
                            : "Completed"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.location}
                    </div>
                  </div>
                  <div className="text-sm font-medium">{booking.price}</div>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      {booking.participants} participant
                      {booking.participants !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ))
        : NoBookings()}
    </div>
  );
}

function NoBookings() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No upcoming bookings</h3>
      <p className="text-muted-foreground mt-1 mb-4">
        You don't have any upcoming reservations.
      </p>
      <Button>Book a Facility</Button>
    </div>
  );
}

export function MyBookingsViewSwitcher() {
  const { viewType, setViewType } = useMyBookings();

  return (
    <div className="flex items-center rounded-md border">
      <Button
        variant={viewType === "list" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-r-none"
        onClick={() => setViewType("list")}
      >
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
      <Button
        variant={viewType === "grid" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-l-none"
        onClick={() => setViewType("grid")}
      >
        <div className="grid grid-cols-2 gap-0.5">
          <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
          <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
          <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
          <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
        </div>
      </Button>
    </div>
  );
}
