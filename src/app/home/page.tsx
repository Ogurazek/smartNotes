
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { NotaResizable } from "@/components/resizablePanel";
import { createClient } from "@/lib/supabaseSsr";
import { redirect } from "next/navigation"

export default async function Home() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();


  if (!user) {
    redirect("/auth/login")
  }


  return (
    <>
      <title>SmartNotes</title>
      <div className="h-screen w-full flex text-slate-800">
        <div className="flex-1 flex flex-col">
          <Navbar />
          <Separator />
          <div className="flex flex-1">
            <NotaResizable />
          </div>
        </div>
      </div>
    </>
  );
}
