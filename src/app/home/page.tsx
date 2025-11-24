import SidebarCreate from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { NotaResizable } from "@/components/resizablePanel";

export default async function Home() {

  const { data, error } = await supabase.from("test").select("*");

  console.log({ data, error });
  return (
    <>
      <title>SmartNotes</title>
      <div className="h-screen w-full flex text-slate-800">
        <div className="flex-1 flex flex-col ">

          <Navbar />
          <Separator />

          <div className="flex flex-1 ">

            <NotaResizable></NotaResizable>

          </div>

        </div>
      </div>
    </>
  );
}
