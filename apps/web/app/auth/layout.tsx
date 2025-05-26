import AppFooter from "@/components/app-header-footer/app-footer";
import AppHeader from "@/components/app-header-footer/app-header";
import ThemeSwitch from "@/components/providers/theme-switch";
import { cn } from "@workspace/ui/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Header */}
      <AppHeader>
        <ThemeSwitch />
      </AppHeader>
      <div className={cn("flex flex-col flex-1 px-4 md:px-6 py-4")}>
        {children}
      </div>
      {/* Footer */}
      <AppFooter />
    </div>
  );
}
