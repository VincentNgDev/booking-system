import BookingCategoryCard from "@/components/book/booking-category-card";

export type ResourceCategory = {
  id: string;
  name: string;
  image?: string;
  description?: string;
};

async function getResourceCategories(): Promise<ResourceCategory[]> {
  return [
    {
      id: "1",
      name: "Courts",
      description: "Book a court for your favorite sport",
    },
    {
      id: "2",
      name: "Coaching",
      description: "Find a coach for your training",
    },
    {
      id: "3",
      name: "Competition",
      description: "Join a competition in your area",
    },
    {
      id: "4",
      name: "Ticket",
      description: "Buy tickets for your favorite sport events",
    },
    {
      id: "5",
      name: "Gym",
      description: "Book a gym for your training",
    },
    {
      id: "6",
      name: "Swimming Pool",
      description: "Book a swimming pool for your training",
    },
    {
      id: "7",
      name: "Fitness Class",
      description: "Join a fitness class in your area",
    },
  ];
}

export default async function BookingCategoryPage() {
  const resourceCategories = await getResourceCategories();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resourceCategories.map((category) => {
        return <BookingCategoryCard key={category.id} category={category} />;
      })}
    </div>
  );
}
