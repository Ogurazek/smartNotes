
"use client";

import { useState, useEffect } from "react";
import { createClientBrowser } from "@/lib/supabase";
import { ROUTES } from "@/constant/routes";
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()

    const supabase = createClientBrowser();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                router.replace(ROUTES.HOME)
            } else {
                setLoading(false)
            }
        }

        checkUser()
    }, [router, supabase])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            router.push(ROUTES.HOME)
        } catch (err: any) {
            setError(err.message || "Error iniciando sesión");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Iniciar Sesión
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                    <p className="text-sm text-center">¿Es la primera vez que estas aquí? <Link href="/auth/register" className="text-blue-600 hover:underline">Crear una cuenta</Link></p>
                </form>
            </div>
        </div>
    );
}
