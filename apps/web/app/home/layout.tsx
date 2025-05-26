import AppFooter from "@/components/app-header-footer/app-footer";
import { ActiveLink } from "@/components/appbar/active-link";
import AppTopbar from "@/components/appbar/app-topbar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import {
  Bell,
  Calendar,
  Clock,
  Dumbbell,
  MapPin,
  Search,
  Settings,
  Users,
  Link as LinkIcon,
  Blocks,
  Shield,
  Wrench,
  MapPinHouse,
  LandPlot,
  Group,
  Box,
  BookMarked,
  LayoutDashboard,
} from "lucide-react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex flex-col h-16 items-start justify-center px-4 md:px-6">
          {/* <h2 className="text-lg font-semibold">Quick Links</h2> */}
        </SidebarHeader>
        <SidebarContent className={cn("py-2")}>
          {/* Quick Link*/}
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Quick Links</h2>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <ActiveLink href="/home">
                <Calendar className="h-4 w-4" />
                <span>Dashboard</span>
              </ActiveLink>
              <ActiveLink href="#">
                <Dumbbell className="h-4 w-4" />
                <span>Book Resource</span>
              </ActiveLink>
              <ActiveLink href="/home/mybooking">
                <Clock className="h-4 w-4" />
                <span>My Bookings</span>
              </ActiveLink>
              <ActiveLink href="#">
                <MapPin className="h-4 w-4" />
                <span>Find Location</span>
              </ActiveLink>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Admin */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Admin</h2>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <ActiveLink href="#">
                <Wrench className="h-4 w-4" />
                <span>Booking Settings</span>
              </ActiveLink>
              <ActiveLink href="#">
                <MapPinHouse className="h-4 w-4" />
                <span>Locations</span>
              </ActiveLink>
              <ActiveLink href="#">
                <Group className="h-4 w-4" />
                <span>Resource Categories</span>
              </ActiveLink>
              <ActiveLink href="#">
                <LandPlot className="h-4 w-4" />
                <span>Resource Types</span>
              </ActiveLink>
              <ActiveLink href="#">
                <Box className="h-4 w-4" />
                <span>Resources</span>
              </ActiveLink>
              <ActiveLink href="#">
                <BookMarked className="h-4 w-4" />
                <span>Reports</span>
              </ActiveLink>
              <ActiveLink href="#">
                <LayoutDashboard className="h-4 w-4" />
                <span>Data visualizations</span>
              </ActiveLink>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Others */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Blocks className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Others</h2>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <ActiveLink href="#">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </ActiveLink>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex min-h-screen flex-col w-full">
        {/* Header */}
        <AppTopbar />

        {/* Main content area */}
        <div className={cn("flex flex-col flex-1 px-4 md:px-6 py-4")}>
          {children}
        </div>
        {/* Footer */}
        <AppFooter />
      </div>
    </SidebarProvider>
  );
}
