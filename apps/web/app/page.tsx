"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Dumbbell, MapPin, Trophy, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import ImageFallback from "@/components/next-image/image-fallback";
import { cn } from "@workspace/ui/lib/utils";
import AppHeader from "@/components/app-header-footer/app-header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <AppHeader>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 md:space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#facilities"
              className="text-sm font-medium hover:text-primary"
            >
              Facilities
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary"
            >
              FAQ
            </Link>
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </nav>
        </div>
      </AppHeader>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full pt-12 pb-12 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Book Sports Facilities{" "}
                    <span className="text-primary">Anytime, Anywhere</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Seamlessly reserve courts, fields, and equipment. Join
                    thousands of athletes who trust SportBook for their sporting
                    needs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-6">
                    Book Now
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    View Facilities
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span>10k+ Users</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>100+ Locations</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>Top Rated</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/sport-book-landing.png"
                  alt="Athletes playing sports"
                  width={380}
                  height={380}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything You Need
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform makes booking sports facilities simple and
                  efficient.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <CardTitle>Easy Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Book your favorite facilities with our intuitive calendar
                    system. View availability in real-time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-primary" />
                  <CardTitle>Equipment Rental</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Forgot your gear? No problem. Rent equipment directly
                    through our platform.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <CardTitle>Location Finder</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover new facilities near you with our interactive map
                    and filtering options.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle>Instant Confirmation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receive immediate booking confirmations and reminders before
                    your scheduled time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  <CardTitle>Loyalty Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn points with every booking and redeem them for discounts
                    on future reservations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section
          id="facilities"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Facilities
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Browse Our Venues
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover top-quality sports facilities available for booking.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Tennis Court",
                  description:
                    "Professional-grade courts with lighting for day and night play.",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Soccer Field",
                  description:
                    "Full-size and small-sided fields with well-maintained turf.",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Basketball Court",
                  description:
                    "Indoor and outdoor courts with professional hoops and markings.",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Swimming Pool",
                  description:
                    "Olympic-sized pools with dedicated lanes for training and recreation.",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Fitness Gym",
                  description:
                    "State-of-the-art equipment for strength and cardio training.",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Volleyball Court",
                  description:
                    "Indoor and beach volleyball courts for casual and competitive play.",
                  image: "/placeholder.svg?height=400&width=600",
                },
              ].map((facility, index) => (
                <Card key={index} className="overflow-hidden">
                  <div
                    className={cn(
                      "aspect-video relative",
                      "bg-gradient-to-br from-neutral-100 to-neutral-400 rounded-t-lg"
                    )}
                  >
                    <ImageFallback
                      src={facility.image || "/images/placeholder.png"}
                      fallbackSrc="/images/placeholder.png"
                      alt={facility.title}
                      fill
                      className="object-contain transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{facility.title}</CardTitle>
                    <CardDescription>{facility.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that works best for you or your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <div className="text-4xl font-bold">$0</div>
                  <CardDescription>
                    Perfect for occasional players
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Book up to 3 facilities per month</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Basic facility search</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Email confirmations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Sign Up Free</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="text-center text-sm font-medium text-primary">
                    Most Popular
                  </div>
                  <CardTitle>Pro</CardTitle>
                  <div className="text-4xl font-bold">$19</div>
                  <CardDescription>
                    Perfect for regular athletes
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Unlimited bookings</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Advanced search filters</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Priority booking (24h advance)</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Equipment rental discounts</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <div className="text-4xl font-bold">$49</div>
                  <CardDescription>Perfect for sports teams</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>All Pro features</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Team management tools</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Recurring bookings</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to elevate your sports experience?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of athletes who have simplified their booking
                  process with SportBook.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="h-12 px-6">
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Take a Tour
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Find answers to common questions about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              {[
                {
                  question: "How do I book a facility?",
                  answer:
                    "Booking is simple! Create an account, search for your desired facility, select an available time slot, and confirm your booking. You'll receive an email confirmation immediately.",
                },
                {
                  question: "Can I cancel my booking?",
                  answer:
                    "Yes, you can cancel bookings up to 24 hours before your scheduled time for a full refund. Cancellations within 24 hours may be subject to a cancellation fee.",
                },
                {
                  question: "Are there any membership requirements?",
                  answer:
                    "No, you can book facilities without a membership using our Basic plan. However, our Pro and Team plans offer additional benefits for regular users.",
                },
                {
                  question: "How far in advance can I book?",
                  answer:
                    "Basic users can book up to 7 days in advance. Pro users can book 14 days in advance, and Team plan users can book up to 30 days in advance.",
                },
                {
                  question: "Do you offer equipment rental?",
                  answer:
                    "Yes, many of our facilities offer equipment rental. You can add equipment to your booking during the checkout process.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              <p className="text-center text-sm leading-loose md:text-left">
                &copy; {new Date().getFullYear()} SportBook. All rights
                reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
