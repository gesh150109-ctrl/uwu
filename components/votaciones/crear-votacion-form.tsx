"use client";

import { useState, useTransition } from "react";
import { crearVotacionGeneralAction } from "@/app/(dashboard)/votaciones/actions";

type Props = {
  esAdmin: boolean;
};

export function CrearVotacionForm({ esAdmin }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [resultadoExitoso, setResultadoExitoso] =
    useState(false);
  const [isPending, startTransition] = useTransition();

  if (!esAdmin) return null;

  function crearVotacion() {
    setMensaje("");

    startTransition(async () => {
      const resultado = await crearVotacionGeneralAction(
        titulo,
        descripcion,
      );

      setResultadoExitoso(resultado.success);
      setMensaje(resultado.message);

      if (resultado.success) {
        setTitulo("");
        setDescripcion("");
      }
    });
  }

  const formularioValido = titulo.trim().length > 0;

  return (
    <section className="rounded-2xl border border-blue-900/70 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 shadow-lg shadow-black/20">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Nueva votación general
        </h2>

        <p className="mt-1 text-sm text-blue-300">
          Crea una votación para los miembros de la asociación.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="titulo"
            className="text-sm font-medium text-slate-200"
          >
            Título
          </label>

          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Ejemplo: Elección de nueva directiva"
            disabled={isPending}
            className="w-full rounded-xl border border-blue-800 bg-blue-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="descripcion"
            className="text-sm font-medium text-slate-200"
          >
            Descripción
          </label>

          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(event) =>
              setDescripcion(event.target.value)
            }
            placeholder="Descripción opcional"
            rows={4}
            disabled={isPending}
            className="w-full resize-none rounded-xl border border-blue-800 bg-blue-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          />
        </div>

        <button
          type="button"
          onClick={crearVotacion}
          disabled={isPending || !formularioValido}
          className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {isPending ? "Creando..." : "Crear votación"}
        </button>

        {mensaje && (
          <p
            className={
              resultadoExitoso
                ? "rounded-lg border border-emerald-800 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-300"
                : "rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300"
            }
          >
            {mensaje}
          </p>
        )}
      </div>
    </section>
  );
}