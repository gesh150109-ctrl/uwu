import MaterialCard from "./MaterialCard";

import type { Tables } from "@/types/database.types";

type Material = Pick<
  Tables<"materiales">,
  | "id"
  | "titulo"
  | "descripcion"
  | "categoria"
  | "tipo"
  | "archivo_url"
  | "archivo_path"
  | "archivo_nombre"
  | "archivo_tamano"
  | "created_at"
>;

interface MaterialGridProps {
  materiales: Material[];
}

export default function MaterialGrid({
  materiales,
}: MaterialGridProps) {
  if (materiales.length === 0) {
    return (
      <div className="rounded-2xl border border-blue-900/70 bg-slate-900/70 px-6 py-16 text-center">
        <p className="text-lg font-semibold text-white">
          Todavía no hay materiales
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Los recursos compartidos aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {materiales.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
        />
      ))}
    </div>
  );
}