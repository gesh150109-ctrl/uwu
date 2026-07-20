"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type MaterialType =
  | "PDF"
  | "DOCX"
  | "PPT"
  | "ZIP"
  | "LINK"
  | "VIDEO";

interface MaterialFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: {
    titulo?: string;
    descripcion?: string;
    categoria?: string;
    tipo?: MaterialType;
    archivo_url?: string | null;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Guardando..." : "Guardar material"}
    </button>
  );
}

export default function MaterialForm({
  action,
  defaultValues,
}: MaterialFormProps) {
  const [tipo, setTipo] = useState<MaterialType>(
    defaultValues?.tipo ?? "PDF",
  );

  const requiereArchivo =
    tipo !== "LINK" && tipo !== "VIDEO";

  const requiereUrl =
    tipo === "LINK" || tipo === "VIDEO";

  return (
    <form
      action={action}
      className="space-y-6 rounded-2xl border border-blue-900/70 bg-slate-900/70 p-8"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Título
        </label>

        <input
          name="titulo"
          required
          defaultValue={defaultValues?.titulo}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Descripción
        </label>

        <textarea
          name="descripcion"
          rows={5}
          defaultValue={defaultValues?.descripcion}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Categoría
          </label>

          <input
            name="categoria"
            defaultValue={defaultValues?.categoria}
            placeholder="Ej. Estatutos"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Tipo
          </label>

          <select
            name="tipo"
            value={tipo}
            onChange={(e) =>
              setTipo(e.target.value as MaterialType)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="PDF">PDF</option>
            <option value="DOCX">Word</option>
            <option value="PPT">PowerPoint</option>
            <option value="ZIP">ZIP</option>
            <option value="LINK">Enlace</option>
            <option value="VIDEO">Video</option>
          </select>
        </div>
      </div>

      {requiereArchivo && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Archivo
          </label>

          <input
            type="file"
            name="archivo"
            required={!defaultValues}
            className="block w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
          />
        </div>
      )}

      {requiereUrl && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            URL
          </label>

          <input
            type="url"
            name="archivo_url"
            required
            defaultValue={defaultValues?.archivo_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>
      )}

      <SubmitButton />
    </form>
  );
}