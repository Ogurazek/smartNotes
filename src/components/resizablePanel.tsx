"use client"

import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Plus, Loader } from "lucide-react"
import { useState } from "react"

export function NotaResizable() {
    const [titulo, setTitulo] = useState("")
    const [nota, setNota] = useState("")
    const [resultadoIA, setResultadoIA] = useState("")
    const [cargando, setCargando] = useState(false)

    const usarIA = async (tipo: "resumir" | "mejorar") => {
        if (!nota.trim()) return

        setCargando(true)
        setResultadoIA("")

        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                texto: nota,
                tipo,
            }),
        })

        const data = await res.json()
        setResultadoIA(data.resultado)
        setCargando(false)
    }

    return (
        <div className="flex-1 p-18 h-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full h-full rounded-lg"
            >
                <ResizablePanel defaultSize={60} minSize={30}>
                    <div className="h-full p-4 flex flex-col">
                        <input
                            type="text"
                            placeholder="Título de la nota..."
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full text-2xl font-bold mb-4 outline-none bg-transparent"
                        />

                        <textarea
                            value={nota}
                            onChange={(e) => setNota(e.target.value)}
                            className="w-full flex-1 bg-transparent outline-none resize-none text-slate-700"
                            placeholder="Escribe aquí..."
                        />

                        <footer className="flex gap-4 mt-4">
                            <Button
                                className="cursor-pointer"
                                disabled={cargando}
                                onClick={() => usarIA("resumir")}
                            >
                                {cargando ? <Loader className="animate-spin" /> : <Plus />}
                                Resumir con IA
                            </Button>

                            <Button
                                className="cursor-pointer"
                                disabled={cargando}
                                onClick={() => usarIA("mejorar")}
                            >
                                {cargando ? <Loader className="animate-spin" /> : <Plus />}
                                Mejorar con IA
                            </Button>
                        </footer>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40} minSize={20}>
                    <div className="h-full p-4 overflow-auto text-slate-700 whitespace-pre-wrap">
                        {cargando && "Procesando con IA..."}
                        {!cargando && !resultadoIA && "Resultado de la IA"}
                        {!cargando && resultadoIA}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
