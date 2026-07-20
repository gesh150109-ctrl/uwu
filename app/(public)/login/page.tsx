"use client";

import {
  FormEvent,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [codigo, setCodigo] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState("");

  async function iniciarSesion(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const {
        data: correo,
        error: rpcError,
      } = await supabase.rpc(
        "obtener_correo_por_codigo",
        {
          p_codigo: codigo.trim(),
        },
      );

      if (rpcError) {
        console.error(rpcError);

        setError(
          "Ocurrió un error al verificar el código.",
        );

        return;
      }

      if (!correo) {
        setError(
          "Código universitario incorrecto.",
        );

        return;
      }

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: correo,
          password,
        });

      if (loginError) {
        console.error(loginError);

        setError(
          "Código universitario o contraseña incorrectos.",
        );

        return;
      }

      router.refresh();
      router.replace("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        "Ocurrió un error inesperado.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={iniciarSesion}
        className="w-full max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-black/20"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">
            Bytecode
          </h1>

          <p className="text-slate-400">
            Iniciar sesión
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Código universitario"
            value={codigo}
            onChange={(event) =>
              setCodigo(event.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            autoComplete="username"
            disabled={loading}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            autoComplete="current-password"
            disabled={loading}
            required
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Ingresando..."
            : "Ingresar"}
        </button>

        <div className="space-y-2 border-t border-slate-800 pt-5 text-center">
          <p className="text-sm text-slate-400">
            ¿Tu solicitud fue aprobada?
          </p>

          <Link
            href="/registro"
            className="inline-block text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Crear mi cuenta
          </Link>
        </div>
      </form>
    </main>
  );
}