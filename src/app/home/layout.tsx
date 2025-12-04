import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartNotes",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 h-screen">
        {children}
      </div>
    </SidebarProvider>
  );
}