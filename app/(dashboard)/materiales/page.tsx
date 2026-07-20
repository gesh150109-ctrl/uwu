import Link from "next/link";
import { Plus } from "lucide-react";

import { getMaterials } from "@/services/materials/get-materials";
import MaterialGrid from "@/components/materials/MaterialGrid";

export default async function MaterialesPage() {
  const materiales = await getMaterials();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Materiales
          </h1>

          <p className="mt-2 text-slate-400">
            Recursos compartidos del círculo.
          </p>
        </div>

        <Link
          href="/materiales/nuevo"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          <Plus size={18} />
          Nuevo material
        </Link>
      </div>

      <MaterialGrid materiales={materiales} />
    </div>
  );
}