"use client"

import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function NotaResizable() {
    return (
        <div className="flex-1 p-18 h-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full h-full rounded-lg"
            >
                <ResizablePanel defaultSize={60} minSize={30}>
                    <div className="h-full p-4">
                        <input
                            type="text"
                            placeholder="Título de la nota..."
                            className="w-full text-2xl font-bold mb-4 outline-none bg-transparent"
                        />

                        <textarea
                            className="w-full min-h-[80%] h-auto bg-transparent outline-none resize-none text-slate-700"
                            placeholder="Escribe aquí..."
                        />

                        <footer className="flex gap-4 mt-4">
                            <Button className="cursor-pointer">
                                <Plus /> Resumir con IA
                            </Button>
                            <Button className="cursor-pointer">
                                <Plus /> Mejorar con IA
                            </Button>
                        </footer>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40} minSize={20}>
                    <div className="h-full p-4">
                        Resultado de la IA
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
