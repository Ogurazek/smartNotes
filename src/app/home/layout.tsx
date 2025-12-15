import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { AppSidebarServer } from "@/components/ui/AppSidebarServer";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarServer />
      <div className="flex-1 h-screen">
        {children}
      </div>
    </SidebarProvider>
  );
}