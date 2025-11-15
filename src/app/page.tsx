import SidebarCreate from "@/components/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { NotaResizable } from "@/components/resizablePanel";




export default function Home() {
  return (
    <>
      <div className="h-screen w-full flex text-slate-800">
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

              {/* <Link href="#">Iniciar Sesión</Link>
              <Link href="#">Registrarse</Link> */}

              <Button className="cursor-pointer"><Plus />Nueva Nota</Button>

              <Avatar className="w-9 h-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <Separator />

          <div className="flex flex-1 ">

            <NotaResizable></NotaResizable>


          </div>

        </div>
      </div>
    </>
  );
}
