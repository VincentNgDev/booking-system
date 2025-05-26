"use client";
import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "url";

export function ActiveLink({
  href,
  children,
}: {
  href: string | UrlObject;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex justify-start",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary"
          : ""
      )}
    >
      {children}
    </Link>
  );
}
