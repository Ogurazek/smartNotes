"use client"

import { NotebookPen } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "./input"
import Image from "next/image"
import { useNotesStore } from "@/store/notes-store"
import { Button } from "./button"
import { useState, useMemo } from "react"

export function AppSidebarClient({ notes }: { notes: any[] }) {
    const setSelectedNote = useNotesStore((state) => state.setSelectedNote)

    const [search, setSearch] = useState("")

    const filteredNotes = useMemo(() => {
        if (!search.trim()) return notes
        return notes.filter((note) =>
            note.titulo.toLowerCase().includes(search.toLowerCase())
        )
    }, [notes, search])

    return (
        <Sidebar>
            <SidebarContent>

                <SidebarHeader className="font-medium p-3 text-[20px] text-center h-14">
                    <div className="flex gap-2 text-center items-center">
                        <Image src="/icon2.png" alt="SmartNotes Logo" width={42} height={42} />
                        <div className="flex">
                            Smart<span className="text-blue-500">Notes</span>
                        </div>
                    </div>
                </SidebarHeader>

                <Separator />

                <SidebarGroup>
                    <Input className="mb-6" placeholder="Buscar notas..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <SidebarGroupLabel>Tus Notas</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>

                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((item) => (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full flex justify-between py-6 cursor-pointer"
                                                onClick={() => setSelectedNote(item)}
                                            >
                                                <span className="text-md">{item.titulo}</span>
                                                <NotebookPen color="gray" />
                                            </Button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground px-4 py-2">
                                    No hay notas
                                </p>
                            )}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}
