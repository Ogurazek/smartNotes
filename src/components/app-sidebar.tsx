import { Calendar, Home, Inbox, Search, Settings, } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "./ui/input"
import Image from "next/image"

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader className="font-medium p-4 text-[20px] text-center">
                    <div className="flex gap-2 text-center items-center">
                        <Image src="/icon2.png" alt="SmartNotes Logo" width={42} height={42} />
                        <div className="flex">
                            Smart<span className="text-blue-500">Notes</span>
                        </div>
                    </div>
                </SidebarHeader>
                <Separator />
                <SidebarGroup>
                    <Input className="mb-6" placeholder="Buscar notas..." />
                    <SidebarGroupLabel>Tus Notas</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="py-6 text-center flex" asChild>
                                        <a href={item.url}>
                                            <span className="text-md">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}