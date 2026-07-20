"use client";

import Link from "next/link";
import {
  FormEvent,
  useState,
  useTransition,
} from "react";

import {
  registrarUsuarioAction,
  type RegistroActionResult,
} from "./actions";

const resultadoInicial: RegistroActionResult = {
  success: false,
  message: "",
};

export default function RegistroPage() {
  const [correo, setCorreo] = useState("");
  const [
    codigoUniversitario,
    setCodigoUniversitario,
  ] = useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmarPassword,
    setConfirmarPassword,
  ] = useState("");

  const [resultado, setResultado] =
    useState<RegistroActionResult>(
      resultadoInicial,
    );

  const [isPending, startTransition] =
    useTransition();

  function registrar(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setResultado(resultadoInicial);

    const formData = new FormData();

    formData.set(
      "correo",
      correo.trim().toLowerCase(),
    );

    formData.set(
      "codigoUniversitario",
      codigoUniversitario.trim(),
    );

    formData.set("password", password);

    formData.set(
      "confirmarPassword",
      confirmarPassword,
    );

    startTransition(async () => {
      const response =
        await registrarUsuarioAction(formData);

      setResultado(response);

      if (response.success) {
        setCorreo("");
        setCodigoUniversitario("");
        setPassword("");
        setConfirmarPassword("");
      }
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <form
        onSubmit={registrar}
        className="w-full max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-black/20"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">
            Crear cuenta
          </h1>

          <p className="text-sm text-slate-400">
            Usa el mismo correo y código de tu
            solicitud aprobada.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(event) =>
              setCorreo(event.target.value)
            }
            autoComplete="email"
            disabled={isPending}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="text"
            name="codigoUniversitario"
            placeholder="Código universitario"
            value={codigoUniversitario}
            onChange={(event) =>
              setCodigoUniversitario(
                event.target.value,
              )
            }
            autoComplete="username"
            disabled={isPending}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="new-password"
            minLength={8}
            disabled={isPending}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="password"
            name="confirmarPassword"
            placeholder="Confirmar contraseña"
            value={confirmarPassword}
            onChange={(event) =>
              setConfirmarPassword(
                event.target.value,
              )
            }
            autoComplete="new-password"
            minLength={8}
            disabled={isPending}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {resultado.message && (
          <div
            role="alert"
            className={
              resultado.success
                ? "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400"
                : "rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
            }
          >
            {resultado.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Creando cuenta..."
            : "Crear cuenta"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </form>
    </main>
  );
}