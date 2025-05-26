import { auth } from "@/auth";
import { QuickActionCard } from "@/components/card/quick-action-card";
import { RecommendedBookingSection } from "@/components/home/recommended-booking-section";
import { UpcomingBookingsSection } from "@/components/home/upcoming-booking-section";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Calendar, Clock, Plus, Trophy, Users } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  console.log("Session:", session);
  return (
    <main className={cn("h-full space-y-6")}>
      {/* Welcome Section */}
      <section className="rounded-lg bg-muted p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">
              Ready for your next sport activities?
            </p>
          </div>
          <Button className="mt-2 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <QuickActionCard href="/home">
          <Calendar className="h-8 w-8 mb-2 text-primary" />
          <p className="text-sm font-medium">Book Resource</p>
        </QuickActionCard>
        <QuickActionCard href="/home">
          <Clock className="h-8 w-8 mb-2 text-primary" />
          <p className="text-sm font-medium">View Schedule</p>
        </QuickActionCard>
        <QuickActionCard href="/home">
          <Users className="h-8 w-8 mb-2 text-primary" />
          <p className="text-sm font-medium">Invite Friends</p>
        </QuickActionCard>
        <QuickActionCard href="/home">
          <Trophy className="h-8 w-8 mb-2 text-primary" />
          <p className="text-sm font-medium">View Rewards</p>
        </QuickActionCard>
      </section>

      {/* Upcoming Bookings */}
      <UpcomingBookingsSection />

      {/* Recommended Resource */}
      <RecommendedBookingSection />

      {/* Quick Booking Widget */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Quick Book</CardTitle>
            <CardDescription>
              Find and book available facilities in seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sport</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Tennis</option>
                  <option>Basketball</option>
                  <option>Swimming</option>
                  <option>Gym</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" defaultValue="2025-05-01" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>Morning (6AM - 12PM)</option>
                  <option>Afternoon (12PM - 5PM)</option>
                  <option>Evening (5PM - 10PM)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>1 hour</option>
                  <option>1.5 hours</option>
                  <option>2 hours</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Find Available Slots</Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
