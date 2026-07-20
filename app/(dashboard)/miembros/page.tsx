import { MiembroCard } from "@/components/miembros/miembro-card";
import { obtenerMiembros } from "@/services/miembros.service";

export default async function MiembrosPage() {
  const { miembros, esAdmin } = await obtenerMiembros();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">
            Miembros
          </h1>

          <p className="mt-2 text-sm text-blue-300">
            Consulta y administra los miembros de la asociación.
          </p>
        </header>

        {miembros.length === 0 ? (
          <div className="rounded-2xl border border-blue-900/70 bg-blue-950/40 p-10 text-center">
            <p className="text-sm text-slate-400">
              No hay miembros registrados.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {miembros.map((miembro) => (
              <MiembroCard
                key={miembro.id}
                miembro={miembro}
                esAdmin={esAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}