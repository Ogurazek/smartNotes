import SidebarCreate from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabaseSsr";
import { NotaResizable } from "@/components/resizablePanel";
import { cookies } from "next/headers";
export default async function Home() {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("users_profile")
    .select("*")
    .single();

  console.log("PROFILE SSR:", profile);



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
