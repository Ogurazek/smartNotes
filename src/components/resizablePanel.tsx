"use client"

import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Plus, Loader, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { createClientBrowser } from "@/lib/supabase";
import { useNotesStore } from "@/store/notes-store"
import { useRouter } from "next/navigation"

export function NotaResizable() {
    const [titulo, setTitulo] = useState("")
    const [nota, setNota] = useState("")
    const [resultadoIA, setResultadoIA] = useState("")
    const [cargando, setCargando] = useState(false)
    const [guardando, setGuardando] = useState(false)

    const supabase = createClientBrowser();

    const selectedNote = useNotesStore((state) => state.selectedNote)

    const router = useRouter()

    useEffect(() => {
        if (selectedNote) {
            setTitulo(selectedNote.titulo)
            setNota(selectedNote.content)
            setResultadoIA(selectedNote.result_ia || "")
        } else {
            setTitulo("")
            setNota("")
            setResultadoIA("")
        }
    }, [selectedNote])

    const usarIA = async (tipo: "resumir" | "mejorar") => {
        if (!nota.trim()) return

        setCargando(true)
        setResultadoIA("")

        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: nota, tipo }),
        })

        const data = await res.json()
        setResultadoIA(data.resultado)
        setCargando(false)
    }

    const guardarNota = async () => {
        if (!titulo.trim() || !nota.trim()) {
            alert("Falta título o contenido")
            return
        }

        setGuardando(true)

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            alert("No estás logueado")
            setGuardando(false)
            return
        }

        let error = null

        if (selectedNote) {
            const { error: updateError } = await supabase
                .from("notes")
                .update({
                    titulo: titulo,
                    content: nota,
                    result_ia: resultadoIA,
                    type_result: resultadoIA ? "ia" : "manual",
                })
                .eq("id", selectedNote.id)

            error = updateError
        } else {
            const { error: insertError } = await supabase.from("notes").insert({
                user_id: user.id,
                titulo: titulo,
                content: nota,
                result_ia: resultadoIA,
                type_result: resultadoIA ? "ia" : "manual",
            })

            error = insertError
        }

        if (error) {
            console.error(error)
            alert("Error al guardar")
        } else {
            alert("Nota guardada correctamente ✅")
            setTitulo("")
            setNota("")
            setResultadoIA("")
            router.refresh()
        }

        setGuardando(false)
    }

    return (
        <div className="flex-1 p-18 h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full rounded-lg">

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

                        <footer className="flex gap-4 mt-4 flex-wrap">

                            <Button className="cursor-pointer" disabled={cargando} onClick={() => usarIA("resumir")}>
                                {cargando ? <Loader className="animate-spin" /> : <Plus />}
                                Resumir con IA
                            </Button>

                            <Button className="cursor-pointer" disabled={cargando} onClick={() => usarIA("mejorar")}>
                                {cargando ? <Loader className="animate-spin" /> : <Plus />}
                                Mejorar con IA
                            </Button>

                            <Button className="cursor-pointer"
                                variant="outline"
                                disabled={guardando}
                                onClick={guardarNota}
                            >
                                {guardando ? <Loader className="animate-spin" /> : <Save />}
                                Guardar Nota
                            </Button>

                        </footer>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40} minSize={20}>
                    <div className="h-full p-4 overflow-auto text-slate-700 whitespace-pre-wrap">
                        {cargando && "Procesando con IA..."}
                        {!cargando && !resultadoIA && "..."}
                        {!cargando && resultadoIA}
                    </div>
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    )
}
