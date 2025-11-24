"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState<"login" | "register">("login");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (mode === "register") {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            setMessage(error ? error.message : "Registro exitoso, revisa tu email");
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            setMessage(error ? error.message : "Inicio de sesión correcto");
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h1 className="text-xl mb-4">
                {mode === "login" ? "Iniciar sesión" : "Registrarse"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-600 text-white p-2 rounded">
                    {mode === "login" ? "Entrar" : "Registrarme"}
                </button>
            </form>

            {message && <p className="mt-3">{message}</p>}

            <button
                className="mt-4 underline"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
                {mode === "login"
                    ? "¿No tienes cuenta? Registrate"
                    : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
        </div>
    );
}
