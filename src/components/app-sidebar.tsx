import { NotebookPen } from 'lucide-react';
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
import { createClient } from "@/lib/supabaseSsr";

export async function AppSidebar() {

    const supabase = await createClient();

    const { data: notes, error } = await supabase
        .from("notes")
        .select("*")

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
                            {notes && notes.length > 0 ? (
                                notes.map((item) => (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton className="py-6 text-center flex cursor-pointer" asChild>
                                            <a href={item.url} className='flex justify-between'>
                                                <span className="text-md">{item.titulo}</span><NotebookPen />
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground px-4 py-2">
                                    No hay notas todavía
                                </p>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}