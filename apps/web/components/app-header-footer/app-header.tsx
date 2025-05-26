import { cn } from "@workspace/ui/lib/utils";
import { Dumbbell } from "lucide-react";

export default function AppHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-4 md:px-6"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span>SportBook</span>
        </div>
        {children}
      </div>
    </header>
  );
}
