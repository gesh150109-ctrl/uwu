import MaterialForm from "@/components/materials/MaterialForm";
import { createMaterialAction } from "../actions";

export default function NuevoMaterialPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Nuevo material
        </h1>

        <p className="mt-2 text-slate-400">
          Comparte un documento o recurso con los miembros.
        </p>
      </div>

      <MaterialForm action={createMaterialAction} />
    </div>
  );
}