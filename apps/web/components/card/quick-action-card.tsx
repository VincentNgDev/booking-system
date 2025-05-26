import { Card, CardContent } from "@workspace/ui/components/card";
import Link from "next/link";
import { UrlObject } from "url";

export function QuickActionCard({
  href,
  children,
}: {
  href: string | UrlObject;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-gradient-to-br from-primary/20 to-primary/5 p-0">
      <Link href={href} className="flex flex-col items-center h-full py-6">
        <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
          {children}
        </CardContent>
      </Link>
    </Card>
  );
}
