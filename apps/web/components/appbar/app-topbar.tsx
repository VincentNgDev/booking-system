"use client";

import { SidebarTrigger, useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import ThemeSwitch from "../providers/theme-switch";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Bell, Dumbbell, FolderOpen, Search } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import React from "react";
import AppHeader from "../app-header-footer/app-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { logoutAction } from "@/actions/auth/action";

export default function AppTopbar({ className }: { className?: string }) {
  const { currentPath } = useAppBar();

  return (
    <AppHeader>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Quick Search ..."
            className="w-[200px] lg:w-[300px] pl-8"
          />
        </div>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            3
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="default"
              className={cn("flex items-center gap-2 px-2")}
            >
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Member</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => logoutAction()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeSwitch />
        <SidebarTrigger
          className={cn(buttonVariants({ variant: "outline" }), "size-9")}
        />
      </div>
    </AppHeader>
  );
}

function useAppBar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const splitArray = pathname.split("/");
  const splitArrayLength = splitArray.length;
  const path =
    splitArray.length > 0 ? splitArray[splitArrayLength - 1] : pathname;
  const currentPath =
    path === "home"
      ? "Dashboard"
      : path!.charAt(0).toUpperCase() + path!.slice(1);

  const context = React.useMemo(() => {
    return {
      isSideBarOpenned: open,
      currentPath,
    };
  }, [pathname, open]);

  return context;
}
