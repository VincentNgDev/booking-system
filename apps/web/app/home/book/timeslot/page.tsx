import { auth } from "@/auth";
import BookingResourceCard from "@/components/book/booking-resource-card";
import {
  FormFieldDatePicker,
  FormPage,
  FormState,
} from "@workspace/ui/components/form-field/edit/form-field";
import { cn } from "@workspace/ui/lib/utils";

async function getResourceDetails() {
  const session = await auth();
  const resourceId = session?.user?.resourceId;
  // Simulate fetching resource details from an API
  return {
    id: resourceId,
    name: "Downtown Tennis Club",
    type: "Tennis",
    location: "123 Main St, Cityville",
    distance: "1.2 miles away",
    rating: 4.8,
    price: "$25/hour",
    amenities: ["Locker Rooms", "Pro Shop", "Coaching Available"],
    image: "/placeholder.svg?height=200&width=400",
  };
}

async function getAvailableTimeSlots(data: any) {
  "use server";
  return {
    success: true,
    message: "Available time slots fetched successfully",
  };
}

export default async function BookingTimeSlotPage() {
  const resource = await getResourceDetails();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Selected Facility Summary */}
        <div className={cn("md:w-1/3")}>
          <BookingResourceCard
            resourceId={resource.id}
            name={resource.name}
            noAction
          />
        </div>

        <FormPage onformSubmit={getAvailableTimeSlots}>
          <FormFieldDatePicker
            propertyName="selectedDate"
            caption="Select Date"
          />
        </FormPage>

        {/* Date and Time Selection */}
        {/* <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Select Date</h2>
            <div className="border rounded-md p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {date && (
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Select Time</h2>
              <p className="text-sm text-muted-foreground">
                Available time slots for {format(date, "MMMM d, yyyy")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {selectedTimeSlot && (
            <Button className="w-full" onClick={() => setStep(3)}>
              Continue
            </Button>
          )}
        </div> */}
      </div>
    </div>
  );
}
