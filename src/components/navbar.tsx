
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full h-20 border-b flex items-center justify-between px-12">
            <h1 className="font-bold text-2xl">Smart<span className="text-blue-500">Notes</span></h1>
            <ul className="flex gap-8">
                <li><Link href="/login">Iniciar Sesión</Link></li>
                <li><Link href="/register">Registrarse</Link></li>
            </ul>
        </nav>
    )
}