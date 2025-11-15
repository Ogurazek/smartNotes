import SidebarCreate from "@/components/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";



export default function Home() {
  return (
    <>
      <div className="h-screen w-full flex bg-red-200 text-slate-800">
        <div className="flex-1 flex flex-col ">

          <header className="h-[82px] bg-white px-6 flex items-center justify-between">
            <SidebarTrigger></SidebarTrigger>
            <div className="flex items-center gap-4">
              {/* <button className="px-4 py-2 border rounded-lg hover:bg-slate-100">
                IA: Mejorar texto
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-slate-100">
                IA: Resumir
              </button> */}

              <Link href="#">Iniciar Sesión</Link>
              <Link href="#">Registrarse</Link>

              <div className="w-9 h-9 bg-slate-300 rounded-full" />
            </div>
          </header>
          <Separator />

          <div className="flex flex-1">

            <div className="flex-1 bg-white p-8">
              <input
                type="text"
                placeholder="Título de la nota..."
                className="w-full text-2xl font-bold mb-4 outline-none bg-transparent"
              />

              <textarea
                className="w-full h-[80%] bg-transparent outline-none resize-none text-slate-700"
                placeholder="Escribe aquí..."
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
