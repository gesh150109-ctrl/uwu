"use client";

import { useActionState } from "react";
import { LoaderCircle, Save } from "lucide-react";

import type { Tables } from "@/types/database.types";

type Session = Pick<
  Tables<"sesiones">,
  | "id"
  | "titulo"
  | "descripcion"
  | "fecha"
  | "hora_inicio"
  | "hora_fin"
  | "lugar"
  | "estado"
>;

export interface SessionFormState {
  error: string | null;
}

interface SessionFormProps {
  action: (
    previousState: SessionFormState,
    formData: FormData,
  ) => Promise<SessionFormState>;

  session?: Session;
  submitLabel?: string;
}

const initialState: SessionFormState = {
  error: null,
};

const inputClassName =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60";

export default function SessionForm({
  action,
  session,
  submitLabel = "Guardar sesión",
}: SessionFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg md:p-8"
    >
      {session && (
        <input
          type="hidden"
          name="id"
          value={session.id}
        />
      )}

      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="titulo"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          Título
        </label>

        <input
          id="titulo"
          name="titulo"
          type="text"
          required
          minLength={3}
          maxLength={150}
          disabled={isPending}
          defaultValue={session?.titulo ?? ""}
          placeholder="Ejemplo: Introducción a estructuras de datos"
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          Descripción
        </label>

        <textarea
          id="descripcion"
          name="descripcion"
          rows={5}
          maxLength={1000}
          disabled={isPending}
          defaultValue={session?.descripcion ?? ""}
          placeholder="Describe los objetivos y temas de la sesión"
          className={`${inputClassName} resize-none`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="fecha"
            className="mb-2 block text-sm font-semibold text-slate-200"
          >
            Fecha
          </label>

          <input
            id="fecha"
            name="fecha"
            type="date"
            required
            disabled={isPending}
            defaultValue={session?.fecha ?? ""}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="lugar"
            className="mb-2 block text-sm font-semibold text-slate-200"
          >
            Lugar
          </label>

          <input
            id="lugar"
            name="lugar"
            type="text"
            maxLength={150}
            disabled={isPending}
            defaultValue={session?.lugar ?? ""}
            placeholder="Ejemplo: Aula 305"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="hora_inicio"
            className="mb-2 block text-sm font-semibold text-slate-200"
          >
            Hora de inicio
          </label>

          <input
            id="hora_inicio"
            name="hora_inicio"
            type="time"
            required
            disabled={isPending}
            defaultValue={
              session?.hora_inicio
                ? session.hora_inicio.slice(0, 5)
                : ""
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="hora_fin"
            className="mb-2 block text-sm font-semibold text-slate-200"
          >
            Hora de fin
          </label>

          <input
            id="hora_fin"
            name="hora_fin"
            type="time"
            required
            disabled={isPending}
            defaultValue={
              session?.hora_fin
                ? session.hora_fin.slice(0, 5)
                : ""
            }
            className={inputClassName}
          />
        </div>
      </div>

      {session && (
        <div>
          <label
            htmlFor="estado"
            className="mb-2 block text-sm font-semibold text-slate-200"
          >
            Estado
          </label>

          <select
            id="estado"
            name="estado"
            required
            disabled={isPending}
            defaultValue={session.estado}
            className={inputClassName}
          >
            <option value="PROGRAMADA">
              Programada
            </option>

            <option value="REALIZADA">
              Realizada
            </option>

            <option value="CANCELADA">
              Cancelada
            </option>
          </select>
        </div>
      )}

      <div className="flex justify-end border-t border-slate-800 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {isPending ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}