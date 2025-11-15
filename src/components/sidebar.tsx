

export default function SidebarCreate() {
    return (
        <aside className="w-64 border-r bg-white p-6 flex flex-col gap-6">
            <h1 className="text-xl font-bold">SmartNotes</h1>

            <button className="bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800">
                + Nueva nota
            </button>

            <div className="flex flex-col gap-2">
                <p className="text-sm text-slate-500 uppercase">Notas</p>
                <div className="flex flex-col gap-1">
                    <div className="p-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                        Nota de ejemplo 1
                    </div>
                    <div className="p-3 hover:bg-slate-100 rounded-lg cursor-pointer">
                        Ideas app IA
                    </div>
                </div>
            </div>
        </aside>
    )
}