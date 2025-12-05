import { createClient } from "@/lib/supabaseSsr"
import { AppSidebarClient } from "./AppSidebarClient"

export async function AppSidebarServer() {
    const supabase = await createClient()

    const { data: notes, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error(error)
    }

    return <AppSidebarClient notes={notes ?? []} />
}
