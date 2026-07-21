import { MiembroCard } from "@/components/miembros/miembro-card";
import { obtenerMiembros } from "@/services/miembros.service";

export default async function MiembrosPage() {
  const { miembros, esAdmin } = await obtenerMiembros();

  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-slate-950 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-6">
        <header className="min-w-0">
          <h1 className="break-words text-3xl font-bold text-white">
            Miembros
          </h1>

          <p className="mt-2 break-words text-sm text-blue-300">
            Consulta y administra los miembros de la asociación.
          </p>
        </header>

        {miembros.length === 0 ? (
          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-blue-900/70 bg-blue-950/40 p-6 text-center sm:p-10">
            <p className="text-sm text-slate-400">
              No hay miembros registrados.
            </p>
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-5">
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